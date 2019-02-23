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

  buildReturnObject = (key, url) => {
    let split = key.split('/')
    let resObj = {}

    resObj.key = key
    resObj.url = url
    resObj.name = split[2]

    return resObj
  }

  getSong = async(args) => {
    let key = args.sortKey.split('#')
    key.unshift(args.genre)
    key = key.join('/')

    return new Promise(resolve => {
      this.bucket.getSignedUrl('getObject', {Key: key}, (err,url) => {
        const resObj = this.buildReturnObject(key,url)
        resolve(resObj) 
      })
    })
  }

  readDynamoMusicTable = (args) => {
    const genre = args.genre;
    const sortKey = args.sortKey;
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
    if (sortKey){
      params.KeyConditionExpression = "genre = :v1 and begins_with(#aas,:v2)"
      params.ExpressionAttributeValues[":v2"] = { S: sortKey };
      params.ExpressionAttributeNames = {
        "#aas":"artist#album#song"
      };
    }

    return this.ddb.query(params).promise()
  }

  getGenres = async() => {
    const allEntries = await this.ddb.scan({TableName: "music"}).promise()
    
    const allGenres = allEntries.Items.map((genreObject)=> {
      return genreObject['genre'].S
    })
    const uniqueGenres = [...new Set(allGenres)].map(genre => {
      return {name: genre}
    })

    return uniqueGenres
  }

  getArtistsByGenre = async(args) => {
    const data = await this.readDynamoMusicTable(args);
    
    const allArtists = data.Items.map((genreObject)=> {
      return genreObject['artist#album#song'].S.split('#')[1]
    })
    const uniqueArtists = [...new Set(allArtists)].map(albumName => {
      return {name: albumName}
    })

    return uniqueArtists
  }

  getAlbumByArtist = async(args) => {
    const data = await this.readDynamoMusicTable(args);
    
    const allAlbums = data.Items.map((genreObject)=> {
      return genreObject['artist#album#song'].S.split('#')[1]
    })
    const uniqueAlbums = [...new Set(allAlbums)].map(albumName => {
      return {name: albumName}
    })

    return uniqueAlbums
  }

  getSongsByAlbum = async(args) => {
    const data = await this.readDynamoMusicTable(args);
  
    const songs = data.Items.map((genreObject)=> {
      return {name : genreObject['artist#album#song'].S.split('#')[2]}
    })
    return songs
  }

}

