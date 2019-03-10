import AWS from 'aws-sdk'

export default class Spotify {
  constructor () {

    this.sqs = new AWS.SQS({
      region: 'us-east-1',
      apiVersion: '2012-11-05'
    });

  }

  listenForPlays = async() =>{
    while (1) {
      const params = {
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/843984047001/reporting',
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
          'artist',
          'album',
          'song'
        ],
        VisibilityTimeout: 20,
        WaitTimeSeconds: 20
      };
      const messages = await this.sqs.receiveMessage(params).promise()
      if(messages.Messages){  
        messages.Messages.map(async(message) => {
          const attributes = message.MessageAttributes;
          console.table(attributes)
          console.log(attributes.song)
          const deleteParams = {
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/843984047001/reporting',
            ReceiptHandle: message.ReceiptHandle
          };
          await this.sqs.deleteMessage(deleteParams).promise()
        })
      }
    }
  }

}