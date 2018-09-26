import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import UserMap from '@/components/NecuKuciMap';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user/:userId',
      name: 'UserMap',
      component: UserMap
    }
  ]
});
