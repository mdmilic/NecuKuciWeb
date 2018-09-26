<template>
  <div class="container-fluid p-0">
    <div class="row border no-gutters">
      <div class="col-sm-6 col-md-9">
        <!-- The map goes here -->
        <NecuKuciMap v-bind:userId='userName'></NecuKuciMap>
      </div>
      <div class="col-sm-6 col-md-3">
        <!-- The IG feed goes here -->
        <!--<div>SUBSCRIBE</div>-->
        <ImageFeed/>
      </div>
      <!--The rest of the app goes here-->
    </div>
  </div>
</template>

<script>
import NecuKuciMap from './NecuKuciMap';
import ImageFeed from './ImageFeed';

export default {
  name: 'Home',
  props: {
    userId: {
      type: String,
      required: false,
      default: 'mdmilic1'
    }
  },
  components: {
    NecuKuciMap,
    ImageFeed
  },
  data () {
    console.log('User: ' + this.$route.params.userId);
    return {
      userName: this.$route.params.userId
    };
  },
  watch: {
    // It should be able to replace this with props = true on Router for each component which will automatically pass route params
    // https://router.vuejs.org/guide/essentials/passing-props.html
    '$route' (to, from) {
      console.log('Home route changed from ' + from.params.userId + ' to ' + to.params.userId);
      console.log('Username is: ' + this.userName);
      this.userName = to.params.userId;
    },
    userId: function (to, from) {
      console.log('Home Property changed from ' + from + ' to ' + to);
    }
  }
};
</script>

<style scoped>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css');
</style>
