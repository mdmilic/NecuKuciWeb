const AWS = require('aws-sdk/clients/dynamodb');
const config = require('../../awsconfig/config');
const util = require('../../utils/util');

module.exports = (app) => {
  app.get('/user', (req, res, next) => {

    let awsConfig;
    if (util.isDevEnv()) {
      console.log("We are in DEV environment");
      awsConfig = config.aws_test_config;
    } else {
      console.log("We are in PROD environment");
      awsConfig = config.aws_prod_config;
    }
    AWS.config.update({region: awsConfig.aws_region});

    const docClient = new AWS.DynamoDB.DocumentClient();
    const userId = req.query.userId;
    const params = {
      TableName: awsConfig.aws_table_name,
      KeyConditionExpression: 'userId = :i',
      ExpressionAttributeValues: {
        ':i': userId
      }
    };
    docClient.query(params, function (err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        console.log('data', data);
        const { items } = data;
        res.send({
          success: true,
          message: 'Loaded location data for' + userId,
          fruits: items
        });
      }
    })

  });
};

