<template>
  <div>
    <!--<div><i class="fas fa-mountain"></i> Highest speed: {{ userStats }}</div>-->
    <div><i class="fas fa-home"></i> Home country: {{ userStats.homeCountry }}</div>
    <!--<div><i class="fas fa-mountain"></i> Distance from home: {{ userStats.homeCountry }}km</div>-->
    <!--<div><i class="fas fa-mountain"></i> Distance traveled: {{ userStats.homeCountry }}km</div>-->
    <div><i class="fas fa-mountain"></i> Highest speed: {{ Math.round(userStats.maxSpeed) }}m</div>
    <div><i class="fas fa-mountain"></i> Highest altitude: {{ Math.round(userStats.maxAltitude) }}m</div>
    <div><i class="fas fa-mountain"></i> Lowest altitude: {{ Math.round(userStats.minAltitude) }}m</div>
    <div><i class="fas fa-flag"></i> Number of countries visited: {{ userStats.countriesVisited.values.length }}</div>
    <div><i class="fas fa-globe-americas"></i> Number of continents visited: {{ userStats.continentsVisited.values.length }}</div>
    <div><i class="fas fa-mountain"></i> Most eastern point: {{ userStats.furthestWent['FURTHEST_EAST_LAT'].toFixed(2) }}, {{ userStats.furthestWent['FURTHEST_EAST_LNG'].toFixed(2) }}</div>
    <div><i class="fas fa-mountain"></i> Most western point: {{ userStats.furthestWent['FURTHEST_WEST_LAT'].toFixed(2) }}, {{ userStats.furthestWent['FURTHEST_WEST_LNG'].toFixed(2) }}</div>
    <div><i class="fas fa-mountain"></i> Most northern point: {{ userStats.furthestWent['FURTHEST_NORTH_LAT'].toFixed(2) }}, {{ userStats.furthestWent['FURTHEST_NORTH_LNG'].toFixed(2) }}</div>
    <div><i class="fas fa-mountain"></i> Most southern point: {{ userStats.furthestWent['FURTHEST_SOUTH_LAT'].toFixed(2) }}, {{ userStats.furthestWent['FURTHEST_SOUTH_LNG'].toFixed(2) }}</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('userStats');

export default {
  name: 'UserStats',
  props: {
    userId: {
      type: String,
      required: false,
      default: 'us-east-1:9cdd84bc-87a3-4bd7-9371-d0ddba8f3bfd'
    }
  },
  data: function () {
    return {
      currentUser: this.userId,
      furthestNorth: null, // idempotent
      furthestSouth: null, // idempotent
      furthestEast: null, // idempotent
      furthestWest: null, // idempotent
      maxSpeed: null, // idempotent
      maxAltitude: null, // idempotent
      numberOfCountries: null, // idempotent (set)
      numberOfContinents: null, // idempotent (set)
      distanceCovered: null, // Can be if daily distance is row, add up daily distances on request
      distanceFromHome: null, // calc realtime
      distanceByTrain: null, // from user input or auto detected or 3rd party
      distanceByPlain: null, // from user input or auto detected or 3rd party
      distanceByBoat: null, // from user input or auto detected or 3rd party
      distanceOnFoot: null, // from user input or auto detected or 3rd party
      daysTraveling: null, // calc realtime
      currentCountry: null, // calc realtime or from set
      lastLatitude: null, // conditional update, idempotent
      lastLongitude: null, // conditional update, idempotent
      lastSeen: null, // idempotent

      errors: []
    };
  },
  created: function () {
  },
  mounted: function () {
    this.loadStats(this.currentUser);
  },
  watch: {
    userId: function (to, from) {
      this.currentUser = to;
      this.fetchUserStats(to);
    }
  },
  computed: mapState([
    'userStatsState',
    'userStats'
  ]),
  methods: {
    ...mapActions([
      'fetchUserStats'
    ]),
    async loadStats (userId) {
      console.log('Loading stats for user: ' + userId);
      this.showSpinner();
      try {
        await this.fetchUserStats(userId);
      } catch (e) {
        console.error('Got Error response from the server while tryong to load stats for user' + userId, e);
        this.errors.push(e);
      } finally {
        this.hideSpinner();
      }
    },
    showSpinner () {
    },
    hideSpinner () {
    }
  }
};
</script>

<style scoped>
</style>
