import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCountry: null,
    selectedState: null,
    showAddStateDrawer: false,
    showAddCityDrawer: false,
    searchMode: true,
    lat: 0, 
    long: 0,
    toast: {
      sclass: "",
      message: "",
      // color: "",
      show: false,
      timeout: -1,
      icons: {
        success: "mdi-check",
        warning: "mdi-alert",
        error: "mdi-window-close",
        info: "mdi-information"
      },
      icon: ""
    },
  },
  mutations: {
    setSelectedCountry(state, payload){
      state.selectedCountry = payload.selectedCountry;
    },
    setSelectedState(state, payload){
      state.selectedState = payload.selectedState
    },
    showAddCityDrawer(state, payload){
      state.showAddCityDrawer = payload
    },
    showAddStateDrawer(state, payload){
      state.showAddStateDrawer = payload
    },
    setLatLong(state, payload){
      const {lat, long} = payload;
      state.lat = lat; 
      state.long = long;
    }, 
    showToast(state, payload) {
      for (const key in payload) {
        state.toast[key] = payload[key];
      }
      state.toast.icon = payload.sclass ? state.toast.icons[payload.sclass] : "";
    }, 
    toggleSearchMode(state){
      state.searchMode = !state.searchMode
    }
  },
  actions: {
    setSelectedCountry({commit}, payload){
      commit("setSelectedCountry", payload)
    }, 
    setSelectedState({commit}, payload){
      commit("setSelectedState", payload)
    }, 
    toggleAddCityDrawer({commit}, payload){
      commit("showAddCityDrawer", payload);
    }, 
    toggleAddStateDrawer({commit}, payload){
      commit("showAddStateDrawer", payload);
    },
    setLatLong({commit}, payload){
      commit("setLatLong", payload)
    },
    showToast({commit}, { show, sclass = "", message = "", timeout = 1000 }) {
      return new Promise(resolve => {
        commit("showToast", { show, sclass, message, timeout });
        resolve(timeout);
      });
    },
    toggleSearchMode({commit},){
      commit("toggleSearchMode");
    }
  },
  getters: {
    selectedCountry(state){
      return state.selectedCountry;
    }, 
    selectedState(state){
      return state.selectedState
    },
    showAddStateDrawer(state){
      return state.showAddStateDrawer
    }, 
    showAddCityDrawer(state){
      return state.showAddCityDrawer
    },
    lat(state){
      return state.lat
    }, 
    long(state){
      return state.long
    }, 
    toast(state) {
      return state.toast;
    }, 
    searchMode(state){
      return state.searchMode;
    }
  },
  modules: {
  }
})
