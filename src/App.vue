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

        <v-toolbar-title class="headline">Geo Cities</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
      <v-switch v-model="$vuetify.theme.dark" hide-details></v-switch>
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
export default {
  components: { StateDrawer, Snackbar, CityDrawer },
  name: "App",

  data: () => ({
    //
  }),
  methods: {
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

