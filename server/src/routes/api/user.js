const AWS = require('aws-sdk/clients/dynamodb');
const util = require('../../utils/util');
const awsConfig = util.requireAWSConfig();

module.exports = (app) => {
  app.get('/user', (req, res, next) => {

    AWS.config.update({region: awsConfig.aws_region});

    const docClient = new AWS.DynamoDB.DocumentClient();
    const userId = req.query.userId;
    const params = {
      TableName: awsConfig.aws_location_table_name,
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
