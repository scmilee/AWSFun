# AWSFun
## A Repo to hold AWS-cloudformation templates for Cloud development

To run :
``` 
git clone git@github.com:scmilee/AWSFun.git 
yarn
yarn dev
```
The yarn dev script defaults to my s3Full role but that can be changed in the package.json , to your profile that allows s3 full access. 

Just take ` "dev": "AWS_PROFILE=s3Full node .electron-vue/dev-runner.js" ` and replace it with ``` "dev": "AWS_PROFILE={your s3 role name from .aws/credentials} .electron-vue/dev-runner.js" ```
