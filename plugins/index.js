// import Vue from 'vue';
// import ViewUI from '@uino/kiss-ui';
// Vue.use(ViewUI);

export default function installKissUI(Vue) { 
    const ViewUI = require('@uino/kiss-ui')
    Vue.use(ViewUI)
 }