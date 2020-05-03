function isDevEnvironment() {
  return process.env.NODE_ENV !== 'production';
}

module.exports = {
  isDevEnv: function () {
    const isDev = isDevEnvironment();
    console.log('The current mode is dev ' + isDev);
    return isDev;
  },

  requireAWSConfig() { // TODO: Move to config.js file
    if (isDevEnvironment()) {
      // return require('../awsconfig/config').aws_test_config;
      // Don't have much location data in the test DDB, so we can use prod for now for website as it's readonly and user table is the same anyway
      return require('../awsconfig/config').aws_prod_config;
    } else {
      return require('../awsconfig/config').aws_prod_config;
    }
  }
};
