import Vue from 'vue';
import Vuex from 'vuex';
import utils from '../utils/util';

import userStats from './modules/userStats';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStats
  },
  strict: utils.isDevEnv()
});
