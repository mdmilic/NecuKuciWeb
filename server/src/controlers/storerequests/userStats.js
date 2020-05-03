exports.get_user_stats_params = function (tableName, userId) {
  return {
    TableName: tableName,
    Key: {'userId': userId}
  };
};
