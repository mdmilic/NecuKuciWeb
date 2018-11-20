import Vue from 'vue';
import Home from './components/Home';
import router from './router/routes';
import store from './store/storeIndex';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    Home
  },
  template: '<Home/>'
});
