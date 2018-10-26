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
      return require('../awsconfig/config').aws_test_config;
    } else {
      return require('../awsconfig/config').aws_prod_config;
    }
  }
};
