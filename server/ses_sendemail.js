// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-east-2' });

// Create sendEmail params
var params = {
  Destination: {
    /* required */
    CcAddresses: [],
    ToAddresses: [
      'mbruer@gmail.com',
      /* more items */
    ],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: 'UTF-8',
        Data: '<p>Yeah!!! You did it</p>',
      },
      Text: {
        Charset: 'UTF-8',
        Data: 'what is this??',
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Test email',
    },
  },
  Source: 'mbruer@gmail.com' /* required */,
  ReplyToAddresses: [
    'mbruer@gmail.com',
    /* more items */
  ],
};

// Create the promise and SES service object
// var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
//   .sendEmail(params)
//   .promise();

// // Handle promise's fulfilled/rejected states
// sendPromise
//   .then(function (data) {
//     console.log(data.MessageId);
//   })
//   .catch(function (err) {
//     console.error(err, err.stack);
//   });
