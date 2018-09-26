const params = require('./storerequests/location');
const ddbUtil = require('./ddbUtils');

exports.get_user = function(req, res, next) {
  const userId = req.query.userId;
  const history = req.query.history;
  const detailLevel = req.query.detail_level;
  console.log('Received params: ' + JSON.stringify({userId, history, detailLevel}));

  const locationParams = params.get_location_params(awsConfig, userId, history, detailLevel, undefined);
  ddbUtil.performPaginatedQuery(params);
  // getLocationData(userId, history, detailLevel, next, res);
  // res.send('NOT IMPLEMENTED: location for last ' + history);
};
