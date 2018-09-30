const ddb = require('./databaseProvider');

exports.putItem = function (params) {
  return ddb.put(params).promise();
};

// Modified from better generic method which uses TS https://www.talentica.com/blogs/dynamo-db-pagination/
exports.performPaginatedQuery = function (params, tableLastEvaluatedKeyFieldNames) {
  return new Promise((resolve, reject) => {
    const dataWithKey = {
      lastEvaluatedKey: undefined,
      result: []
    };
    // adding 1 extra items due to a corner case bug in DynamoDB, find details below.
    const originalItemPerPageCount = params.Limit;
    params.Limit = params.Limit + 1;
    let remainingItemsCount = 0;
    ddb.query(params, onQuery);


    function onQuery(err, data) {
      if (err) {
        return reject(err);
      }
      dataWithKey.result = dataWithKey.result.concat(data.Items);
      remainingItemsCount = (originalItemPerPageCount + 1) - dataWithKey.result.length;
      if (remainingItemsCount > 0) {
        if (typeof data.LastEvaluatedKey === "undefined") {
          // pagination done, this is the last page as LastEvaluatedKey is undefined
          return resolve(dataWithKey);
        } else {
          // Continuing pagination for more data
          // as we did not get our desired itemsPerPage. Remember ScannedCount and Count fields!!
          params.ExclusiveStartKey = data.LastEvaluatedKey;
          params.Limit = remainingItemsCount;
          // console.log('Query being paginated with ' + JSON.stringify(data.LastEvaluatedKey, undefined, 2));
          ddb.query(params, onQuery);
        }
      } else {
        dataWithKey.result = dataWithKey.result.slice(0, originalItemPerPageCount);
        // pagination done, but this is not the last page. making lastEvaluatedKey to
        // send to browser
        dataWithKey.lastEvaluatedKey = prepareLastEvaluatedKeyString(
          dataWithKey.result[originalItemPerPageCount - 1], tableLastEvaluatedKeyFieldNames);
        return resolve(dataWithKey);
      }
    }
  });
};

// Preparing lastEvaluatedKey as comma seperated values of lastEvaluatedKey fields
function prepareLastEvaluatedKeyString(dataObj, tableLastEvaluatedKeyFieldNames) {
  let key = "";
  tableLastEvaluatedKeyFieldNames.forEach((field) => {
    key += dataObj[field] + ",";
  });
  if (key !== "") {
    key = key.substr(0, key.length - 1);
  }
  return key;
}

