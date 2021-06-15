import Vue from 'vue'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { createProvider } from './vue-apollo'
import router from './router'

import { Icon } from 'leaflet';
import store from './store'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-tooltip', LTooltip);

Vue.config.productionTip = false

new Vue({
  vuetify,
  apolloProvider: createProvider(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
