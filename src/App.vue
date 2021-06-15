<template>
  <v-app>
    <v-app-bar
      height="72px"
      @scroll="checkScroll"
      :color="$vuetify.theme.dark ? '#272727' : '#ffffff'"
      style="z-index: 2"
      app
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/earth.gif')"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title
          class="headline"
          v-if="$vuetify.breakpoint.mdAndUp"
          :class="
            $vuetify.theme.dark ? 'white--text' : 'grey--text text--darken-3'
          "
          ><strong>Geo</strong>
          <span class="font-weight-normal">Cities</span></v-toolbar-title
        >
      </div>

      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="toggleSearchMode"
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-2' : 'mx-1'"
        ><v-icon :color="searchMode ? 'primary' : ''">{{
          searchMode ? "mdi-magnify-minus" : "mdi-magnify"
        }}</v-icon></v-btn
      >
      <v-switch v-model="$vuetify.theme.dark" hide-details>
        <template v-slot:label>
          <v-icon v-if="!$vuetify.theme.dark">mdi-weather-sunny</v-icon>
          <v-icon v-else>mdi-weather-night</v-icon>
        </template>
      </v-switch>
      <v-btn
        to="/"
        class="mx-2"
        color="primary"
        :icon="$vuetify.breakpoint.smAndDown"
        ><v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-earth</v-icon>
        <span v-if="$vuetify.breakpoint.mdAndUp">Home</span></v-btn
      >
      <!-- <v-btn to="/about" class="mx-2" text
        ><v-icon left>mdi-information-outline</v-icon> About</v-btn
      > -->
    </v-app-bar>
    <StateDrawer />
    <CityDrawer />

    <v-main>
      <transition name="router-anim">
        <router-view />
      </transition>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import CityDrawer from "./components/shared/CityDrawer.vue";
import Snackbar from "./components/shared/Snackbar.vue";
import StateDrawer from "./components/shared/StateDrawer.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { StateDrawer, Snackbar, CityDrawer },
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["searchMode"]),
  },
  methods: {
    ...mapActions(["toggleSearchMode"]),
    checkScroll(e) {
      console.log({ e });
    },
  },
};
</script>

<style>
.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.3s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.3s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

*::-webkit-scrollbar {
  width: 10px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background-color: #e91e63;
  border-radius: 10px;
  border: transparent;
}
/* body::-webkit-scrollbar {
  width: 1rem;
}

body::-webkit-scrollbar-track {
  background: var(--secondary);
}

body::-webkit-scrollbar-thumb {
  background: var(--primary);
}
*::-webkit-scrollbar-thumb {
  background: var(--primary);
}

*::-webkit-scrollbar {
  width: 1rem;
}

*::-webkit-scrollbar-track {
  background: var(--secondary);
} */
</style>

