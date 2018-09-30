const params = require('./storerequests/signup');
const ddbUtil = require('./ddbUtils');

const AWS = require('aws-sdk');
const awsConfig = require('../utils/util').requireAWSConfig();

//Create SNS client and pass in region.
const sns = new AWS.SNS({
  apiVersion: '2010-03-31',
  region: awsConfig.aws_region
});

exports.signupUser = async function(request, response, next) {
  const emailField = request.body.email;
  const nameField = request.body.name;
  const previewBool = request.body.previewAccess;

  try {
    console.log('Matched POST signup route %s', JSON.stringify(request.body));

    let signupParams = params.post_signup(awsConfig.aws_signup_table, emailField, nameField, previewBool);
    const putResult = await ddbUtil.putItem(signupParams); // TODO: put if not exists

    console.log('Singup put response %s', JSON.stringify(putResult));

    let snsMessage = 'New signup for NecuKuci Travel Tracker: ' + emailField; //Send SNS notification containing email from form.
    let snsResult = await sns.publish(params.sns_params(snsMessage, awsConfig.aws_singup_sns_topic)).promise();

    console.log('Sent SNS message %s', snsResult.MessageId);

    response.sendStatus(200);
  } catch (e) {
    console.error('Error signing up new user ' + emailField, e);
    next(e);
  }
};