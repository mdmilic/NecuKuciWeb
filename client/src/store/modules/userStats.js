import statsService from '@/services/userStatsService';

const state = {
  userStats: null,
  userStatsState: 'UNAVAILABLE'
};

const getters = {

};

const actions = {
  async fetchUserStats ({ commit }, userName) {
    console.log('Fetching stats for user: ' + userName);
    commit('setStatsState', 'FETCHING');
    const userStats = await statsService.getUserStats(userName);
    // console.log('Stats received: ' + JSON.stringify(userStats.data.Item));
    commit('userStatsFetched', userStats.data.Item);
    commit('setStatsState', 'AVAILABLE');
  }
};

const mutations = {
  userStatsFetched (state, userStats) {
    state.userStats = userStats;
  },

  setStatsState (state, userStatsState) {
    state.userStatsState = userStatsState;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
