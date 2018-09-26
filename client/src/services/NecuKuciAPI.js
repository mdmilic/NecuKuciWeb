const axios = require('axios');
const utils = require('../utils/util');

let baseUrl;
if (utils.isDevEnv()) {
  baseUrl = 'api/';
} else {
  baseUrl = 'http://necukuci.us-east-1.elasticbeanstalk.com/api/';
}

export const apiHTTP = axios.create({
  baseURL: baseUrl
  // baseURL: 'api/'
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
});
