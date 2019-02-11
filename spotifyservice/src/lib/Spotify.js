import AWS from 'aws-sdk'

export default class Spotify {
  constructor (bucketName='dylandrudgeshomeworky') {
    this.bucketName = bucketName + "/";

    this.bucket = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: bucketName}
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
        this.bucket.getSignedUrl('getObject', params, (err,url)=> {
          if(err) console.log(err);

          const resObj = {
            key: object.Key,
            url: url
          }
          resolve(resObj);
        })
      })
    })

    const res = await Promise.all(urls)
    .catch(e => {
      console.error(e);
    })
    console.log(res)
    return res
    }

  getSongs = async(args) => {
    const objectList = await this.listObjects(args);
    let refinedList = [];

    objectList.Contents.map(object => {
      const key = object.Key
      const extension = key.split('.').pop();

      if (extension === "mp3") {
        refinedList.push(object)
      }

    })
    return await this.signUrls(refinedList);
  }

}

