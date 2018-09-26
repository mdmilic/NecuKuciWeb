module.exports = {
  aws_test_config: {
    aws_region: 'us-east-1',
    aws_table_name: 'necukuci-mobilehub-725813148-GeoStoreTest',
    aws_index: 'userId-utcTimeMillis'
  },
  aws_prod_config: {
    aws_region: 'us-east-1',
    aws_table_name: 'necukuci-mobilehub-725813148-GeoStore',
    aws_index: 'userLocationProjection'
  }
};
