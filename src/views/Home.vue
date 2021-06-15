<template>
  <div class="home">
    <div class="map" style="height: calc(100vh - 72px); position: relative">
      <v-expand-transition>
        <v-card
          v-show="searchMode"
          class="px-2 pt-0 pb-1"
          :width="$vuetify.breakpoint.mdAndUp ? '500px' : '90vw'"
          style="z-index: 4; position: absolute; top: 20px; right: 20px"
          floating
        >
          <CitySearch @foundCity="foundCity" />
        </v-card>
      </v-expand-transition>
      <l-map
        :zoom="zoom"
        style="z-index: 1"
        @click="moveMarker"
        :center="[latitude, longitude]"
      >
        <!-- https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' -->
        <!-- : 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' -->
        <!-- 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' -->
        <!-- : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' -->
        <l-tile-layer
          :url="
            !$vuetify.theme.dark
              ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          "
        ></l-tile-layer>
        <l-marker draggable @dragend="moved" :lat-lng="[latitude, longitude]">
          <l-tooltip>My City is here!</l-tooltip>
        </l-marker>
      </l-map>
    </div>
    <Intro />
  </div>
</template>

<script>
import CitySearch from "../components/forms/CitySearch.vue";
import Intro from "../components/modals/Intro.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      latitude: 0,
      longitude: 0,
      zoom: 3,
    };
  },
  computed: {
    ...mapGetters(["searchMode"]),
  },

  components: {
    CitySearch,
    Intro,
  },
  methods: {
    ...mapActions(["setLatLong"]),
    foundCity(e) {
      console.log({ e });
      if (e.city) {
        const { latitude, longitude } = e.city;

        this.setCoords(latitude, longitude);

        setTimeout(() => {
          if (e.type === "city") {
            this.zoom = 10;
          } else if (e.type === "state") {
            this.zoom = 7;
          } else if (e.type === "country") {
            this.zoom = 5;
          }
        }, 500);
        return;
      }

      if (e.type === "country") {
        this.zoom = 3;
        setTimeout(() => {
          this.setCoords(0, 0);
        }, 500);
      }

      if (e.type === "city") {
        this.zoom = 7;
      }
      if (e.type === "state") {
        this.zoom = 5;
      }
    },
    moveMarker(e) {
      console.log({ e });
      const {
        latlng: { lat, lng },
      } = e;
      this.setCoords(lat, lng);
    },
    moved(e) {
      console.log(e);
      const { lat, lng } = e.target._latlng;
      this.setCoords(lat, lng);
    },
    setCoords(lat, long) {
      this.latitude = lat;
      this.longitude = long;
      this.setLatLong({ lat, long });
    },
  },
};
</script>
