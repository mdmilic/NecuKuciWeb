const {apiHTTP} = require('@/services/necuKuciAPI');
const utils = require('../utils/util');

export default {
  async getUserLocation (params) {
    let locationRequest;
    if (utils.isDevEnv()) {
      locationRequest = 'location?userId=us-east-1:9cdd84bc-87a3-4bd7-9371-d0ddba8f3bfd&history=36&detail_level=15';
    } else {
      locationRequest = 'location?userId=us-east-1:9cdd84bc-87a3-4bd7-9371-d0ddba8f3bfd&history=180&detail_level=15';
    }
    return apiHTTP.get(locationRequest);
  },

  nearMe (params) {
    throw new Error('Near Me Functionality not implemented yet');
  }
};
