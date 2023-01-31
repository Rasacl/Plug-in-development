import imageUpload from './src/imageUpload.vue'

imageUpload.install = function(Vue) {
    Vue.component(imageUpload.name, imageUpload);
}

export default imageUpload