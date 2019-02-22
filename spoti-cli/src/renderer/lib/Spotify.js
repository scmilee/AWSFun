import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'
const { dialog } = require('electron').remote


export default class Spotify {
  constructor (bucketName) {
    this.bucketName = bucketName + "/";
    this.bucket = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: bucketName}
    });

    this.ddb = new AWS.DynamoDB({
      region: 'us-east-1',
      apiVersion: '2012-08-10'
    });
  }

  choosePath = async() => {
    return await dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]})
  }

  keyBuilder = (names) => {
    const key = names.join('/')
    return key
  }

  directoryCheck = (parentPath,baseKey) => {
    if (!fs.lstatSync(parentPath).isDirectory()) {
      this.upload(parentPath, baseKey);
      return
    }

    fs.readdir(parentPath, (err, files) => {
      if (err) throw err;
      if(!files || files.length === 0) {
        console.log(`provided folder '${parentPath}' is empty or does not exist.`);
        console.log('Make sure yo ur project was compiled!');
        return;
      }
    
      for (const fileName of files) {
        const subPath = path.join(parentPath, fileName);
        const subBaseKey = path.join(baseKey,fileName)
        
        if (fs.lstatSync(subPath).isDirectory()) {
          this.directoryCheck(subPath, subBaseKey);
        }
        else if(fileName !== '.DS_Store'){ //cuz screw ds store
          this.upload(subPath, subBaseKey);
        }
      }
    })
  }

  upload = async(path,key) => {
    await this.dynamoUpload(key)

    fs.readFile(path, (err,data)=>{
      if (err) throw err;

      this.bucket.upload({
        Key: key,
        Body: data,
        ACL: 'private'
      }, (err, data) => {
        if (err) {
          console.log(err)
        }
        console.log('Successfully uploaded stuff.');
        return data
      });
    })
  }
  
  dynamoUpload = (key) => {
    const musicEntryDetails = key.split('/')
    const artistAlbumSong = musicEntryDetails.slice(1).join('#')

    const params = {
      Item: {
       "genre": {
         S: musicEntryDetails[0]
        }, 
       "artist#album#song": {
         S: artistAlbumSong
        }
      },
      TableName: "music"
     };
     return this.ddb.putItem(params).promise()  
  }

}

