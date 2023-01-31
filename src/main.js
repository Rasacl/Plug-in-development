import Vue from 'vue';
import App from "./App.vue";
import configUI from '../configTest/config'
// import KissUI from '@uino/kiss-ui'
Vue.use(configUI);
// Vue.use(KissUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
