<template>
  <div id="map"></div>
</template>

<script>
import locationService from '@/services/locationService';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('userStats');
require('leaflet-spin');

const L = require('leaflet');

// OpenStreetMap
// const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const mapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
// Mapbox
const mapAccessToken = 'pk.eyJ1IjoibWRtaWxpYyIsImEiOiJjam0xaGkxdHAwNDI4M2xxcjFrNWZqN3czIn0.E_DqxkPrVuJCkeNxGX0PAg';
const mapAttribution = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';
const mapUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

export default {
  name: 'NecuKuciMap',
  props: {
    userId: {
      type: String,
      required: false,
      default: 'us-east-1:9cdd84bc-87a3-4bd7-9371-d0ddba8f3bfd'
    }
  },
  data: function () {
    return {
      map: null, /* Will be populated later */
      currentUser: this.userId,
      // tileLayer: null,
      // layers: []
      errors: []
    };
  },
  created: function () {
    console.log('Vue is created for user: ' + this.currentUser);
  },
  mounted: function () {
    console.log('Vue is mounted for user: ' + this.currentUser);
    this.initMap();
    this.initLayers(this.currentUser);
    this.setCurrentPosition(this.currentUser);
  },
  watch: { // TODO: Move to computed
    userId: function (to, from) {
      console.log('Map userId property changed from ' + from + ' to ' + to);
      this.currentUser = to;
      this.initLayers(to);
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
    initMap () {
      this.map = L.map('map', {
        zoomDelta: 0.5,
        zoomSnap: 0.5
      });

      this.map.setView([30, 0], 2);

      // https://www.mapbox.com/api-documentation/#the-style-object
      // https://stackoverflow.com/questions/37166172/mapbox-tiles-and-leafletjs
      L.tileLayer(mapUrl, {id: 'mapbox.streets',
        attribution: mapAttribution,
        maxZoom: 14,
        minZoom: 2,
        accessToken: mapAccessToken
      }).addTo(this.map);
      L.control.scale().addTo(this.map);
      // OpenStreetMap
      // L.tileLayer(mapUrl, {
      //   maxZoom: 18,
      //   attribution: mapAttribution
      // }).addTo(this.map);
    },
    async initLayers (userId) {
      console.log('Loading path for user: ' + userId);
      this.showSpinner();
      try {
        const response = await locationService.getUserLocation();

        // JSON responses are automatically parsed.
        // console.log('Got response from the server ' + JSON.stringify(response, undefined, 2));
        let points = [];
        response.data.forEach(function (elem) {
          const point = new L.LatLng(elem.latitude, elem.longitude);
          // console.log('Adding point: ' + JSON.stringify(point));
          points.push(point);
        });

        let route = new L.Polyline(points, {
          color: 'red',
          weight: 3,
          opacity: 0.5,
          smoothFactor: 1
        });
        route.addTo(this.map);
        this.map.fitBounds(route.getBounds(), {
          padding: [50, 50],
          maxZoom: 6,
          // animate: true,
          duration: 0.25
        });
        // https://leafletjs.com/reference-1.3.4.html#map-fitbounds
        // this.map.flyTo([40, 100], 4);
      } catch (e) {
        console.error('Got Error response from the server while trying to load route for user' + userId, e);
        this.errors.push(e);
      } finally {
        this.hideSpinner();
      }
      // this.$router.push({ name: 'UserMap', params: { userId: 'mdmilic' } });
    },
    async setCurrentPosition (userId) {
      console.log('Initial state: ' + this.userStatsState);
      await this.fetchUserStats(userId);
      console.log('Final state: ' + this.userStatsState);
      const marker = L.marker([this.userStats.lastKnownLat, this.userStats.lastKnownLng]);
      marker.bindPopup('<b>Last seen on:</b><br>' + new Date(this.userStats.lastSeen).toString()).openPopup();
      marker.addTo(this.map);
    },
    showSpinner () {
      this.map.spin(true);
    },
    hideSpinner () {
      this.map.spin(false);
    }
  }
};
</script>

<style scoped>
  @import url('https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css');
  @import url('https://unpkg.com/leaflet@1.3.4/dist/leaflet.css');
    /*<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"*/
    /*integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="*/
    /*crossorigin=""/>*/
  #map {
    height: 100vh;
  }
</style>
