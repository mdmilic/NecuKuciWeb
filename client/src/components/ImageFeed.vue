<template>
  <!-- The IG feed goes here -->
  <div id="instafeed" class="verticalFeedScrolling">
  </div>
</template>

<script>
const Instafeed = require('instafeed.js');
const accessToken = '7729165666.1677ed0.29628589966a4fd1aba6ff58637a265b';
const clientID = 'a6efe20264eb47e5b0462e8800f04874';
const userID = '7729165666';

export default {
  name: 'ImageFeed',
  data: function () {
    return {
      userFeed: null,
      errors: []
    };
  },
  props: {
    userId: {
      type: String,
      required: false,
      default: 'hello_world_kat_and_mark'
    }
  },
  mounted: function () {
    this.initInstafeed();
  },
  watch: {
    userId: function (to, from) {
      console.log('ImageFeed userId property changed from ' + from + ' to ' + to);
    }
  },
  methods: {
    initInstafeed () {
      this.userFeed = new Instafeed({
        get: 'user',
        userId: userID,
        clientId: clientID,
        accessToken: accessToken,
        resolution: 'standard_resolution',
        template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" class="img-thumbnail img-fluid"/></a>',
        sortBy: 'most-recent',
        limit: 20,
        links: false
      });
      this.userFeed.run();
    }
  }
};
</script>

<style scoped>
  /*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap.min.css">*/
  @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap.min.css');
  .verticalFeedScrolling {
    height: 100%;
    position: absolute;
    overflow-y: scroll;
  }
  .horizontalFeedScrolling {
    width: 100%;
    position: absolute;
    overflow-x: scroll;
  }
</style>
