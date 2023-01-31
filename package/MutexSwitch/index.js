import MutexSwitch from './src/MutexSwitch.vue'

MutexSwitch.install = function(Vue) {
    Vue.component(MutexSwitch.name, MutexSwitch);
}

export default MutexSwitch