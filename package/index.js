import Multiselection from './Multiselection';
import Multistring from './Multistring';
import Multinumber from './Multinumber';
import StyleConfig from './StyleConfig';
import ColorTableRange from './ColorTableRange';
import ColorTableUnique from './ColorTableUnique';
import EditorSlider from './EditorSlider';
import ValueDefault from './ValueDefault';
import ColorPickerMult from './ColorPickerMult';
import MutexSwitch from './MutexSwitch';
import ImageUpload from './imageUpload';
import MulitImageUpload from './mulitImageUpload';
import StringWithSelect from './stringWthSelect';
import Indexblock from './indexBlock';
import Title from './Title';
import FormConfig from './FormConfig';
import SignConfig from './SignConfig';
import installKissUI from '../plugins/index';
// import '@uino/kiss-ui/dist/styles/kiss-ui.css';
// import '../public/assets/css/white-theme.less'



// 新增组件时也需要在数组中添加注册
const components = [
    MutexSwitch,
    Multiselection,
    Multistring,
    StyleConfig,
    Multinumber,
    ColorTableRange,
    ColorTableUnique,
    EditorSlider,
    ValueDefault,
    ColorPickerMult,
    ImageUpload,
    MulitImageUpload,
    StringWithSelect,
    Indexblock,
    Title,
    FormConfig,
    SignConfig
];

const install = function (Vue) {
    installKissUI(Vue)
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

if (typeof window != 'undefined' && window.Vue) {
    installKissUI(window.Vue)
    install(window.Vue);
}

export default {
    install,
    ...components
}