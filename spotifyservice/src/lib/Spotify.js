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
      apiVersion: '2012-08-10',
      
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

  readDynamo = (args) => {
    const genre = args.genre;

    let params = {
      KeyConditionExpression: "genre = :v1" ,
      ExpressionAttributeValues: {
        ":v1": {
          S: genre
        }
      }, 
      TableName: "music"
    };
    //if a sort key was passed in with the query
    //change the key expression to include a beginswith
    //to check and see that the specified genre has a sortkey that begins with the passed in sort key
    //then assign the needed variables to parse since back to back #'s cause errors
    //this allows all queries to use this function by slowly narrowing sortkey scope
    if (args.sortKey){
      params.KeyConditionExpression = "genre = :v1 and begins_with(#aas,:v2)"
      params.ExpressionAttributeValues[":v2"] = {S: args.sortKey};
      params.ExpressionAttributeNames = {
        "#aas":"artist#album#song"
      };
    }

    return this.ddb.query(params).promise()
  }

  getGenres = async(args) => {
    
  }
  getArtistsByGenre = async(args) => {
    console.log(await this.readDynamo(args))
  }
  getAlbumByArtist = async(args) => {
    
  }
  getSongsByAlbum = async(args) => {
    
  }

}

