import Title from './src/Title.vue'

Title.install = function(Vue) {
    Vue.component(Title.name, Title);
}

export default Title