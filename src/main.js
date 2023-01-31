import Vue from 'vue';
import App from "./App.vue";
import configUI from '../configTest/config'
// import '../configTest/font'
Vue.use(configUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
