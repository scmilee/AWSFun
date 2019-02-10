# spoticry

> A vue / electron project mimic

#### Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:9080
yarn dev

```
The yarn dev script defaults to my s3Full role but that can be changed in the package.json , to your profile that allows s3 full access. 

Just take ` "dev": "AWS_PROFILE=s3Full node .electron-vue/dev-runner.js" ` and replace it with ``` "dev": "AWS_PROFILE={your s3 role name from .aws/credentials} .electron-vue/dev-runner.js" ```