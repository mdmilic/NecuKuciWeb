const AWS = require('aws-sdk'); // TODO: Move it to 'aws-sdk/clients/dynamodb'
const utils = require('../utils/util');
let awsConfig;
if (utils.isDevEnv()) {
  awsConfig = require('../awsconfig/config').aws_test_config;
} else {
  awsConfig = require('../awsconfig/config').aws_prod_config;
}

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
