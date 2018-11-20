const {apiHTTP} = require('@/services/necuKuciAPI');

export default {
  async getUserStats (params) {
    console.log('Params received: ' + params);
    return apiHTTP.get('stats?userId=' + params);
  }
};
