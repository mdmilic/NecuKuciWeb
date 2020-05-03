// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html
exports.get_location_params = function (awsConfig, userId, lastSeen, history, detailLevel, lastEvaluatedKey) {
  return {
    ExpressionAttributeValues: {
      ':user': userId,
      // TODO Make this conditional if history or detail level is present
      // ':geoHashTime': '3898017947583216931_1533485',
      // history is in days, so convert to millis first
      ':utcMillis': lastSeen - parseInt(history, 10) * 24 * 60 * 60 * 1000,
      ':locationProviderTag': 'locationCallback'
    },
    // When reading from table with geoHash_Time as sort key
    // KeyConditionExpression: 'userId = :user and begins_with(geoHash_Time, :geoHashTime)',
    // When reading from GSI with time as sort key
    KeyConditionExpression: 'userId = :user and utcTimeMillis >= :utcMillis',
    FilterExpression: 'NOT contains (tags, :locationProviderTag)',
    TableName: awsConfig.aws_location_table_name,
    IndexName: awsConfig.aws_location_table_index,
    ProjectionExpression: 'latitude, longitude, utcTimeMillis',
    ExclusiveStartKey: lastEvaluatedKey,
    // TODO: LIMIT IS REQUIRED FOR NOW, fix in ddbUtils.js
    Limit: 100000
  };
};
