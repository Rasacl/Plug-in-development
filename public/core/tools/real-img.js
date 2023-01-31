import Vue from 'vue';

/**
* 检测图片是否存在
* @param url
*/
const imageIsExist = (url) => new Promise((resolve) => {
    let img = new Image();
    img.onload = function () {
        if (this.complete === true) {
            resolve(true);
            img = null;
        }
    };
    img.onerror = () => {
        resolve(false);
        img = null;
    };
    img.src = url;
});
// 全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive('real-img', {
    bind: async (el, binding) => { // 指令名称为：real-img
        el.style.display = 'none';
        // eslint-disable-next-line global-require
        const imgURL = binding.value;// 获取图片地址
        if (imgURL) {
            const exist = await imageIsExist(imgURL);
            if (exist) {
                el.setAttribute('src', imgURL);
            } else {
                const defaultURL = require('@/assets/img/avater_default.png');// 错误默认显示图片
                el.setAttribute('src', defaultURL);
            }
            el.style.display = 'inline-block';
        }
    },
});
