# AWSFun


## CLI- Uploader
### uploads files or directories to S3 and DDB simultaneuously 
To run CLI uploader :
``` 
git clone git@github.com:scmilee/AWSFun.git 
cd spoti-cli
yarn
yarn dev
```
The yarn dev script defaults to my s3Full role but that can be changed in the package.json , to your profile that allows s3 full access. 
Just take ` "dev": "AWS_PROFILE=s3Full node .electron-vue/dev-runner.js" ` and replace it with ``` "dev": "AWS_PROFILE={your s3 role name from .aws/credentials} .electron-vue/dev-runner.js" ```

## SpotifyService
### a GraphQl API for retrieving music and user data from DDB and S3, and logging to SQS when a song is played.
To run spotifyMusicService API :
``` 
git clone git@github.com:scmilee/AWSFun.git 
cd spotifyservice
npm install
npm start
```

## Play-logger
### pulls from SQS queue named reporting, then console.tables the output
Play-Logger takes messages from an SQS queue and console.tables them.
To run play-Logger:
``` 
git clone git@github.com:scmilee/AWSFun.git 
cd play-logger
npm install
npm start
```
## Client-Spotify
### React-app mimicking Spotify,uses Firebase for auth and a Spotify-Service endpoint for retreiving/logging data.


