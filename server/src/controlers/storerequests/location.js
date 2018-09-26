// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
exports.get_location_params = function (awsConfig, userId, history, detailLevel, lastEvaluatedKey) {
  const currentTime = Date.now();
  console.log('Current time: ' + currentTime);
  console.log('Past time: ' + history);
  console.log('Past time: ' + parseInt(history, 10));
  return {
    ExpressionAttributeValues: {
      ':user': userId,
      // TODO Make this conditional if history or detail level is present
      // ':geoHashTime': '3898017947583216931_1533485',
      // history is in days, so convert to millis first
      ':utcMillis': currentTime - parseInt(history, 10) * 24 * 60 * 60 * 1000,
      // ':topic': 'PHRASE'
    },
    // When reading from table with geoHash_Time as sort key
    // KeyConditionExpression: 'userId = :user and begins_with(geoHash_Time, :geoHashTime)',
    // When reading from GSI with time as sort key
    KeyConditionExpression: 'userId = :user and utcTimeMillis >= :utcMillis',
    // FilterExpression: 'contains (Subtitle, :topic)',
    TableName: awsConfig.aws_table_name,
    IndexName: awsConfig.aws_index,
    ProjectionExpression: 'latitude, longitude, utcTimeMillis',
    ExclusiveStartKey: lastEvaluatedKey,
    // TODO: LIMIT IS REQUIRED FOR NOW, fix in ddbUtils.js
    Limit: 50000
  };
};
