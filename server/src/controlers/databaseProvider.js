const AWS = require('aws-sdk'); // TODO: Move it to 'aws-sdk/clients/dynamodb'
const utils = require('../utils/util');
const awsConfig = utils.requireAWSConfig();

// Set the region
// AWS.config.update({region: awsConfig.aws_region});
// Uncomment to turn on the logging for AWS SDK
// AWS.config.logger = console;
console.log('Creating new DDB client!');
const ddb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: awsConfig.aws_region
});

module.exports = ddb;
