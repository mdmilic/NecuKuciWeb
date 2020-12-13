<template>
  <div id="map">
    <div id="sidebar" class="leaflet-sidebar collapsed">
      <!-- Nav tabs -->
      <div class="leaflet-sidebar-tabs">
        <ul role="tablist"> <!-- top aligned tabs -->
          <li><a href="#instagram-feed" role="tab"><i class="fas fa-image"></i></a></li>
          <li><a href="#profile" role="tab"><i class="fas fa-chart-line"></i></a></li>
          <li><a href="https://www.instagram.com/hello_world_kat_and_mark/" role="tab" target="_blank"><i class="fab fa-instagram"></i></a></li>
          <li><a href="https://www.youtube.com/c/helloworldkatandmark/" role="tab" target="_blank"><i class="fab fa-youtube"></i></a></li>
        </ul>
      </div>

      <!-- Tab panes -->
      <div class="leaflet-sidebar-content">
        <div class="leaflet-sidebar-pane" id="instagram-feed">
          <h1 class="leaflet-sidebar-header">Media Feed<div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
          <ImageFeed/>
        </div>
        <div class="leaflet-sidebar-pane" id="profile">
          <h1 class="leaflet-sidebar-header">Travel Statistics<div class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></div></h1>
          <UserStats/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageFeed from './ImageFeed';
import UserStats from './UserStats';
import locationService from '@/services/locationService';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('userStats');
require('leaflet-spin');
require('leaflet-polylinedecorator');

const L = require('leaflet');
require('leaflet-sidebar-v2');

// OpenStreetMap
const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
// Mapbox
// const mapAccessToken = 'pk.eyJ1IjoibWRtaWxpYyIsImEiOiJjam0xaGkxdHAwNDI4M2xxcjFrNWZqN3czIn0.E_DqxkPrVuJCkeNxGX0PAg';
// const mapAttribution = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';
// const mapUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

export default {
  name: 'NecuKuciMap',
  props: {
    userId: {
      type: String,
      required: false,
      default: 'us-east-1:9cdd84bc-87a3-4bd7-9371-d0ddba8f3bfd'
    }
  },
  components: {
    UserStats,
    ImageFeed
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
      // L.tileLayer(mapUrl, {id: 'mapbox.streets', // This map is local language by default
      // L.tileLayer(mapUrl, {id: 'mapbox.satellite',
      //   attribution: mapAttribution,
      //   maxZoom: 14,
      //   minZoom: 2,
      //   accessToken: mapAccessToken
      // }).addTo(this.map);

      // OpenStreetMap
      L.tileLayer(mapUrl, {
        maxZoom: 14,
        minZoom: 2,
        attribution: mapAttribution
      }).addTo(this.map);
      L.control.scale().addTo(this.map);

      L.control.sidebar({
        autopan: false,       // whether to maintain the centered map point when opening the sidebar
        closeButton: true,    // whether t add a close button to the panes
        container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
        position: 'left'     // left or right
      }).addTo(this.map);
      //
      // /* add a new panel */
      // let panelContent = {
      //   id: 'userinfo',                     // UID, used to access the panel
      //   tab: '<i class="fa fa-gear"></i>',  // content can be passed as HTML string,
      //   pane: '<p>Some text blah blah</p>',        // DOM elements can be passed, too
      //   title: 'Your Profile',              // an optional pane header
      //   position: 'bottom'                  // optional vertical alignment, defaults to 'top'
      // };
      // sidebar.addPanel(panelContent);
      // /* add an external link */
      // sidebar.addPanel({
      //   id: 'ghlink',
      //   tab: '<i class="fa fa-github"></i>',
      //   button: 'https://github.com/nickpeihl/leaflet-sidebar-v2'
      // });
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
          color: 'blue',
          weight: 2,
          stroke: true,
          opacity: 0.6,
          smoothFactor: 1
        });
        route.addTo(this.map);
        L.polylineDecorator(route, {
          patterns: [
            // defines a pattern of 10px-wide dashes, repeated every 20px on the line
            {offset: 0,
              repeat: 200,
              symbol: L.Symbol.arrowHead(
                {pixelSize: 7,
                  polygon: false,
                  headAngle: 60,
                  pathOptions: {
                    color: 'blue',
                    stroke: true,
                    opacity: 1.0,
                    fillOpacity: 1,
                    weight: 2
                  }
                })}
          ]
        }).addTo(this.map);
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
      this.map.flyTo([this.userStats.lastKnownLat, this.userStats.lastKnownLng]);
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
  /* TODO: Start using css loader */
  /*@import url('https://api.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css');*/
  @import url('https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css');
  @import url('https://unpkg.com/leaflet@1.6.0/dist/leaflet.css');
  /* TODO: Start using local copy of leaflet-sidebar.css */
  @import url('https://cdn.jsdelivr.net/npm/leaflet-sidebar-v2@3.2.2/css/leaflet-sidebar.css');
  /* TODO: Move font awsome to using FA vue components from https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs */
  @import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');

  #map {
    height: 100vh;
  }
</style>
