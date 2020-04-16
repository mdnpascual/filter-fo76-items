import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, BCard, BTabs } from 'bootstrap-vue'

Vue.component('b-card', BCard);
Vue.component('b-tabs', BTabs);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
