import AWS from 'aws-sdk'

export default class Spotify {
  constructor (bucketName='dylandrudgeshomeworky') {
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

  listObjects = async(args) => {
    return new Promise(resolve => {
      this.bucket.listObjects({}, function(err, data) {
        if (err) console.log(err, err.stack); 
        else{
          resolve( data)
        }
      });
    });
  }

  signUrls = async(data) => {
    const urls = data.map( object => {
      return new Promise(resolve => {

        const params = {Key: object.Key}
        this.bucket.getSignedUrl('getObject', params, (err,url) => {
          if(err) console.log(err);

          const resObj = this.buildReturnObject(object.Key,url)

          resolve(resObj);
        })
      })
    })

    const res = await Promise.all(urls)
    .catch(e => {
      console.error(e);
    })
    return res
  }

  buildReturnObject = (key, url) => {
    let split = key.split('/')
    let resObj = {}

    resObj.key = key
    resObj.url = url
    resObj.name = split[2]

    return resObj
  }

  getSong = async(args) => {
    const objectList = await this.listObjects(args);
    let refinedList = [];

    objectList.Contents.map(object => {
      if (object.Key.endsWith('.mp3'))  refinedList.push(object)
    })
    
    return await this.signUrls(refinedList);
  }

  getGenres = async(args) => {
    
  }
  getArtistsByGenre = async(args) => {

  }
  getAlbumByArtist = async(args) => {
    
  }
  getSongsByAlbum = async(args) => {
    
  }

}

