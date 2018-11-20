module.exports = {
  aws_test_config: {
    aws_region: 'us-east-1',
    aws_singup_sns_topic: 'arn:aws:sns:us-east-1:223459704384:necukuci-signup-notifications',
    aws_signup_table: 'necukuci-signup-table',
    aws_location_table_name: 'necukuci-mobilehub-725813148-GeoStoreTest',
    aws_location_table_index: 'userId-utcTimeMillis',
    aws_user_stats_table_name: 'necukuci-mobilehub-725813148-UserStats'
  },
  aws_prod_config: {
    aws_region: 'us-east-1',
    aws_singup_sns_topic: 'arn:aws:sns:us-east-1:223459704384:necukuci-signup-notifications',
    aws_signup_table: 'necukuci-signup-table',
    aws_location_table_name: 'necukuci-mobilehub-725813148-GeoStore',
    aws_location_table_index: 'locationAndTagsProjection',
    aws_user_stats_table_name: 'necukuci-mobilehub-725813148-UserStats'
  }
};
