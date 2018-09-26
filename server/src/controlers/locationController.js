// Load the AWS SDK for JavaScript
const utils = require('../utils/util');
const params = require('./storerequests/location');
const ddbUtil = require('./ddbUtils');

let awsConfig;
if (utils.isDevEnv()) {
  awsConfig = require('../awsconfig/config').aws_test_config;
} else {
  awsConfig = require('../awsconfig/config').aws_prod_config;
}

// /location?userId=mdmilic&detailLevel=11&history=7
exports.get_location = async function(request, response, next) {
  const userId = request.query.userId;
  const history = request.query.history;
  const detailLevel = request.query.detail_level;
  const startTime = Date.now();

  console.log(startTime + ' Received params: ' + JSON.stringify({userId, history, detailLevel}));

  try {
    let locationParams = params.get_location_params(awsConfig, userId, history, detailLevel, undefined);
    const queryResult = await ddbUtil.performPaginatedQuery(locationParams, ['utcTimeMillis', 'userId']);
    // console.log('Query worked: ' + JSON.stringify(queryResult, undefined, 2));

    console.log('Fetched %d data points in %d ', queryResult.result.length, (Date.now() - startTime));
    response.json(queryResult.result);
  } catch (e) {
    console.error('Error querying DDB ', e);
    next(e);
  }
};
