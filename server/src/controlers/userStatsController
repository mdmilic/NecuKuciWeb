const params = require('./storerequests/userStats');
const ddbUtil = require('./ddbUtils');

const awsConfig = require('../utils/util').requireAWSConfig();

exports.getUserStats = async function(request, response, next) {
  const userId = request.body.userId;

  try {
    let statsParams = params.get_user_stats_params(awsConfig.aws_user_stats_table_name, userId);
    const getResult = await ddbUtil.getItem(statsParams);

    console.log('getItem worked: ' + JSON.stringify(getResult, undefined, 2));
    response.json(getResult);
  } catch (e) {
    console.error('Error getting user stats ' + userId, e);
    next(e);
  }
};
