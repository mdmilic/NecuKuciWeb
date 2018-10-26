exports.post_signup = function (tableName, emailSubmitted, nameSubmitted, previewPreference) {
  return {
    TableName: tableName,
    Item: {
      email: emailSubmitted,
      name: nameSubmitted,
      preview: previewPreference
    }
  }
};

exports.sns_params = function (message, topicArn) {
  return {
    Message: message, /* required */
    TopicArn: topicArn
  }
};
