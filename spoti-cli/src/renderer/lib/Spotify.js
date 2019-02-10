import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'
const { dialog } = require('electron').remote


export default class Spotify {
  constructor (bucketName) {
    this.bucketName = bucketName + "/";
    console.log(this.bucketName)
    this.bucket = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: bucketName}
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
        console.log(subBaseKey, 'subbasekey ');
        
        if (fs.lstatSync(subPath).isDirectory()) {
          this.directoryCheck(subPath, subBaseKey);
        }
        else{
          this.upload(subPath, subBaseKey);
        }
      }
    })
  }

  upload = async(path,key) => {
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
        alert('Successfully uploaded stuff.');
        return data
      });
    }) 

  }
  //woops didn't need to write this
  rename = async(OLD_KEY, NEW_KEY) => {
    
    this.bucket.copyObject({
      CopySource: `${this.bucketName}${OLD_KEY}`, 
      Key: NEW_KEY
    }).promise()
    .then(() => 
      this.bucket.deleteObject({
        Key: OLD_KEY
      }).promise()
    )
    .catch((e) => console.error(e))
  }

   

}

