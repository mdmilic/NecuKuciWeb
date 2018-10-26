<template>
</template>

<script>
export default {
  name: 'UserStats',
  props: {
    userId: {
      type: String,
      required: false,
      default: 'us-east-1:9cdd84bc-87a3-4bd7-9371-d0ddba8f3bfd'
    },
    userLocations: {
      type: String,
      required: true
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
    this.extractStats(this.currentUser);
  },
  watch: {
    userId: function (to, from) {
      this.currentUser = to;
      this.extractStats(to);
    }
  },
  methods: {
      extractStats (userId) {
      }
  }
</script>

<style scoped>
</style>
