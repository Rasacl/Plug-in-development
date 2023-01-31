<template>
    <Form @submit.native.prevent :model="form" label-position="top" :label-width="160" v-if="refresh">
        <div v-for="(configItem, index) in DecoratorConfig[uiContent]" :key="index" :style="calcStyle(configItem)">
            <FormItem :ref="configItem.des" v-if="!configItem.block" style="margin-bottom:0px;"
                :class="(configItem.type === 'block' || 'indexblock') && !alwaysblock ? 'titleStyle' : 'labelStyle'">
                <Title v-if="configItem.type === 'block'" :data="configItem.caption" :tooltip="configItem.content" />
                <label v-else slot="label">
                    <!-- <div v-if="configItem.type==='block'" style="height:14px;width:3px;background: #ff954b;transform: translateX(-8px);line-height:30px;display:inline-block"></div>
                    <span v-if="configItem.type==='block'" style="font-size:14px;font-weight:bold;line-height:30px;">{{configItem.caption}}</span> -->
                    <span v-if="configItem.type === 'indexblock'"></span>
                    <!-- <span style="font-size:14px;font-weight:bold;">{{configItem.caption}}</span> -->
                    <span v-else>{{ configItem.caption }}</span>
                    <Tooltip v-if="configItem.content" :content="configItem.content" placement="right" transfer max-width="220">
                        <Icon custom="iconfont icon-tips" style="font-size: 12px;color: rgb(153, 153, 153);" />
                    </Tooltip>
                </label>
                <template v-if="configItem.type === 'bool'">
                    <i-switch v-model="form[configItem.des]" size="small" />
                </template>
                <template v-if="configItem.type === 'string'">
                    <Input style="width:200px" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'number'">
                    <InputNumber :max="configItem.max" :min="configItem.min" style="width:200px"
                        v-model="form[configItem.des]" />
                </template>
                <!-- configItem.gradientRamp为true就渲染颜色渐变器组件，不传或者false渲染纯色组件 -->
                <template
                    v-if="configItem.type === 'color' && !configItem.gradientRamp && (form[configItem.des] || form[configItem.des] === '')">
                    <ColorPicker v-model="form[configItem.des]" transfer v-if="colorchange"
                        @on-change="(val) => changecolor(val, configItem.des)"
                        :alpha="(form[configItem.des] || form[configItem.des] === '') && form[configItem.des].length == 9" />
                </template>
                <!-- 颜色渐变器 -->
                <template v-if="configItem.type === 'color' && configItem.gradientRamp && form[configItem.des]">
                    <ColorPickerMult v-if="true" class="line-height-21" :ref="'colorPickerMult'"
                        @changeSingleColor="changeSingleColor"
                        :headerStyle="'width:59px;height: 32px;left: 0;position: relative;display: inline-block;padding: 0;top: 4px;'"
                        @changeLinearColor="changeLinearColor" @confirm="colorPickConfirm(configItem.des)"
                        @cancel="colorPickCancel(configItem.des)" :color="colorPick.data.single.value"
                        :tools="colorPick.colorMultSetting" />
                </template>
                <template v-if="configItem.type === 'slider'">
                    <EditorSlider v-model="form[configItem.des]" :conf="configItem" />
                </template>
                <template v-if="configItem.type === 'select'">
                    <Select v-model="form[configItem.des]" style="width: 200px" transfer
                        @on-select="changeSelect($event, configItem.selection)">
                        <Option v-for="item in configItem.selection" :key="item.key" :value="item.key">{{ item.keyname }}
                        </Option>
                    </Select>
                </template>
                <template v-if="configItem.type === 'multiselection'">
                    <Multiselection :conf="configItem" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'multistring'">
                    <Multistring :conf="configItem" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'multinumber'">
                    <Multinumber :conf="configItem" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'MutexSwitch'">
                    <MutexSwitch :conf="configItem" :value.sync="form[configItem.des]" :flag="configItem.flag"
                        :unique="'des'" />
                </template>
                <template v-if="configItem.type === 'styleConfig'">
                    <Button @click="showstyleConfig(configItem)">配置</Button>
                    <StyleConfig :ref="configItem.des" :conf="configItem" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'colorTableUnique'">
                    <ColorTableUnique :conf="configItem" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'colorTableRange'">
                    <ColorTableRange :conf="configItem" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'valueDefault'">
                    <ValueDefault :conf="configItem" v-model="form[configItem.des]" :form="form"
                        @onChange="changeDefault" />
                </template>
                <template v-if="configItem.type === 'imageUpload'">
                    <ImageUpload :conf="configItem" v-model="form[configItem.des]" :originPath="originPath"
                        :originConfig="DecoratorConfig.config" @onChange="changeDefault" />
                </template>
                <template v-if="configItem.type === 'mulitImageUpload'">
                    <MulitImageUpload :conf="configItem" v-model="form[configItem.des]" :originPath="originPath"
                        :originConfig="DecoratorConfig.config" @onChange="changeDefault" />
                </template>
                <template v-if="configItem.type === 'stringWithSelect'">
                    <StringWithSelect :options="configItem.options" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'indexblock'">
                    <Indexblock :conf="configItem" v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'textarea'">
                    <Input type="textarea" :autosize="configItem.autosize" style="width:200px"
                        v-model="form[configItem.des]" />
                </template>
                <template v-if="configItem.type === 'resourceSelect'">
                    <ResourceSelect v-model="form[configItem.des]" :resourceType="configItem.resourceType"
                        :fileType="configItem.fileType ? configItem.fileType : []" :useUpload="configItem.useUpload" />
                </template>
                <template v-if="configItem.type === 'block' && maxblocklines[configItem.caption]">
                    <FormItem v-for="iline in maxblocklines[configItem.caption]" :key="iline">
                        <div v-for="(configItemx, ind) in DecoratorConfig[uiContent]" :key="ind"
                            :style="calcStyle(configItemx)">
                            <FormItem :ref="configItemx.des"
                                v-if="configItemx.block && configItemx.block.name === configItem.caption && configItemx.block.line === iline"
                                class="FormIteminblock">
                                <!-- :style="{width:configItemx.width?configItemx.width+'px':'auto'}" -->
                                <label slot="label">
                                    <span style="font-size:2px;">{{ configItemx.caption }}</span>
                                    <Tooltip v-if="configItemx.content" :content="configItemx.content" placement="right" max-width="220"
                                        transfer>
                                        <Icon custom="iconfont icon-tips"
                                            style="font-size: 12px;color: rgb(153, 153, 153);" />
                                    </Tooltip>
                                </label>
                                <template v-if="configItemx.type === 'bool'">
                                    <i-switch v-model="form[configItemx.des]" size="small" />
                                </template>
                                <template v-if="configItemx.type === 'string'">
                                    <Input :style="{ width: configItemx.width ? configItemx.width + 'px' : '200px' }"
                                        v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'number'">
                                    <InputNumber :max="configItemx.max" :min="configItemx.min"
                                        :style="{ width: configItemx.width ? configItemx.width + 'px' : '200px' }"
                                        v-model="form[configItemx.des]" />
                                </template>
                                <!-- configItemx.gradientRamp为true就渲染颜色渐变器组件，不传或者false渲染纯色组件 -->
                                <template
                                    v-if="configItemx.type === 'color' && !configItemx.gradientRamp && (form[configItemx.des] || form[configItemx.des] === '')">
                                    <ColorPicker v-model="form[configItemx.des]" transfer v-if="colorchange"
                                        @on-change="(val) => changecolor(val, configItemx.des)"
                                        :alpha="(form[configItemx.des] || form[configItemx.des] === '') && form[configItemx.des].length == 9" />
                                </template>
                                <!-- 颜色渐变器 -->
                                <template
                                    v-if="configItemx.type === 'color' && configItemx.gradientRamp && form[configItemx.des]">
                                    <ColorPickerMult v-if="true" class="line-height-21" :ref="'colorPickerMult'"
                                        @changeSingleColor="changeSingleColor"
                                        :headerStyle="'width:59px;height: 32px;left: 0;position: relative;display: inline-block;padding: 0;top: 4px;'"
                                        @changeLinearColor="changeLinearColor"
                                        @confirm="colorPickConfirm(configItemx.des)"
                                        @cancel="colorPickCancel(configItemx.des)" :color="colorPick.data.single.value"
                                        :tools="colorPick.colorMultSetting" />
                                </template>
                                <template v-if="configItemx.type === 'slider'">
                                    <EditorSlider v-model="form[configItemx.des]" :conf="configItemx" />
                                </template>
                                <template v-if="configItemx.type === 'select'">
                                    <Select v-model="form[configItemx.des]"
                                        :style="{ width: configItemx.width ? configItemx.width + 'px' : '200px' }" transfer
                                        @on-select="changeSelect($event, configItemx.selection)">
                                        <Option v-for="item in configItemx.selection" :key="item.key" :value="item.key">
                                            {{ item.keyname }}</Option>
                                    </Select>
                                </template>
                                <template v-if="configItemx.type === 'multiselection'">
                                    <Multiselection :style="{ width: configItemx.width ? configItemx.width + 'px' : '200px' }"
                                        :conf="configItemx" v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'multistring'">
                                    <Multistring :style="{ width: configItemx.width ? configItemx.width + 'px' : '200px' }"
                                        :conf="configItemx" v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'multinumber'">
                                    <Multinumber :style="{ width: configItemx.width ? configItemx.width + 'px' : '200px' }"
                                        :conf="configItemx" v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'MutexSwitch'">
                                    <MutexSwitch :conf="configItemx" :value.sync="form[configItemx.des]"
                                        :flag="configItemx.flag" :unique="'des'" />
                                </template>
                                <template v-if="configItemx.type === 'styleConfig'">
                                    <Button @click="showstyleConfig(configItemx)">配置</Button>
                                    <StyleConfig :ref="configItemx.des" :conf="configItemx"
                                        v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'colorTableUnique'">
                                    <ColorTableUnique :conf="configItemx" v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'colorTableRange'">
                                    <ColorTableRange :conf="configItemx" v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'valueDefault'">
                                    <ValueDefault :conf="configItemx" v-model="form[configItemx.des]" :form="form"
                                        @onChange="changeDefault" />
                                </template>
                                <template v-if="configItemx.type === 'imageUpload'">
                                    <ImageUpload :conf="configItemx" v-model="form[configItemx.des]"
                                        :originPath="originPath" :originConfig="DecoratorConfig.config"
                                        @onChange="changeDefault" />
                                </template>
                                <template v-if="configItemx.type === 'mulitImageUpload'">
                                    <MulitImageUpload :conf="configItemx" v-model="form[configItemx.des]"
                                        :originPath="originPath" :originConfig="DecoratorConfig.config"
                                        @onChange="changeDefault" />
                                </template>
                                <template v-if="configItemx.type === 'stringWithSelect'">
                                    <StringWithSelect :options="configItemx.options" v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'indexblock'">
                                    <Indexblock :conf="configItemx" v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'textarea'">
                                    <Input type="textarea" :autosize="configItemx.autosize" style="width:200px"
                                        v-model="form[configItemx.des]" />
                                </template>
                                <template v-if="configItemx.type === 'resourceSelect'">
                                    <ResourceSelect v-model="form[configItemx.des]"
                                        :showLocalResource="configItemx.showLocalResource"
                                        :resourceType="configItemx.resourceType"
                                        :fileType="configItemx.fileType ? configItemx.fileType : []"
                                        :useUpload="configItemx.useUpload" />
                                </template>
                            </FormItem>
                        </div>
                    </FormItem>
                </template>
                <template v-if="configItem.note">
                    <div>{{ configItem.note }}</div>
                </template>
            </FormItem>
        </div>
    </Form>

</template>

<script>
import Multiselection from '../../Multiselection';
import Multistring from '../../Multistring';
import Multinumber from '../../Multinumber';
import StyleConfig from '../../StyleConfig';
import ColorTableRange from '../../ColorTableRange';
import ColorTableUnique from '../../ColorTableUnique';
import EditorSlider from '../../EditorSlider';
import ValueDefault from '../../ValueDefault';
import ColorPickerMult from '../../ColorPickerMult';
import MutexSwitch from '../../MutexSwitch';
import ImageUpload from '../../imageUpload';
import MulitImageUpload from '../../mulitImageUpload';
import StringWithSelect from '../../stringWthSelect';
import Indexblock from '../../indexBlock';
// import ResourceSelect from './elements/resource-select.vue';
import Title from '../../Title';

export default {
    name: 'FormConfig',
    components: {
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
        // ResourceSelect,
        Title,
    },
    props: ['form', 'DecoratorConfig', 'uiContent', 'maxblocklines', 'alwaysblock', 'originPath', 'colorPick'],
    data() {
        return {
            refresh: true,
            colorchange: true,
        };
    },
    // watch: {
    //     'form': {
    //         handler(newValue,oldValue){
    //             this.emitParent()
    //          	},
    //     mmediate:true,  // 该参数设置为true，可以在初始化的时候让handler调用一下    
  	// 	deep:true	// 该参数设置为true，可以监听到对象内的属性 而不止于当前对象
    //     }
    // },
    updated() {
    },
    methods: {
        
        // styleConfig配置
        showstyleConfig(configItem) {
            this.$refs[configItem.des][0].show = true;
        },
        changecolor(val, key) {
            this.colorchange = false;
            this.$nextTick(() => {
                this.colorchange = true;
            });
            if (val && val.includes('rgba')) {
                this.form[key] = this.rgbaToHex(val);
            }
        },
        changeDefault() {
            this.refresh = false;
            this.$nextTick(() => {
                this.refresh = true;
            });
        },
        // 颜色渐变器
        changeSingleColor(v) {
            const RGBAObj = v.color;
            if (this.colorPick.classification === 'single') {
                if (RGBAObj.rgba) {
                    const RGBAStr = `rgba(${RGBAObj.rgba.r},${RGBAObj.rgba.g},${RGBAObj.rgba.b},${RGBAObj.rgba.a})`;
                    this.colorPick.data.type = 'single';
                    this.colorPick.data.single.value = RGBAStr;
                    // = this.selectColors.rgba = RGBAStr;
                } else if (RGBAObj.indexOf('rgba') !== -1) {
                    this.colorPick.data.type = 'single';
                    this.colorPick.data.single.value = RGBAObj;
                }
                // this.$parent.setColorPS(this.selectColors);
            }
        },
        changeLinearColor(object) {
            this.colorPick.data.type = 'single';
            this.colorPick.data.single.value = object.color;
        },
        colorPickConfirm(value) {
            const val = this.colorPick.data.single.value;
            if (val && val.constructor === Object) {
                const map = new Map();
                const arr = [];
                for (const key in val) {
                    map.set(key, this.rgbaToHex(val[key]));
                    arr.push(key);
                }
                arr.sort((m, n) => {
                    if (m < n) return -1;
                    if (m > n) return 1;
                    return 0;
                });
                this.form[value] = {
                    values: [],
                    intervals: [],
                    gradientType: '',
                };
                arr.forEach((item) => {
                    this.form[value].values.push(map.get(item));
                });
                this.form[value].intervals = arr;
                this.form[value].gradientType = 'vertical';
            } else {
                this.form[value] = this.rgbaToHex(val);
            }
        },
        colorPickCancel(value) {
            this.colorPick.data.single.value = this.form[value];
        },
        rgbaToHex(color) {
            const values = color
                .replace(/rgba?\(/, '')
                .replace(/\)/, '')
                .replace(/[\s+]/g, '')
                .split(',');
            const a = parseFloat(values[3] || 1);
            const r = Math.floor(parseInt(values[0])); // eslint-disable-line  radix
            const g = Math.floor(parseInt(values[1])); // eslint-disable-line  radix
            const b = Math.floor(parseInt(values[2])); // eslint-disable-line  radix
            const aToSixteen = Math.floor((a * 255));
            return `#${(`0${r.toString(16)}`).slice(-2)}${(`0${g.toString(16)}`).slice(-2)}${(`0${b.toString(16)}`).slice(-2)}${(`0${aToSixteen.toString(16)}`).slice(-2)}`;
        },
        colorRgb(val) {
            // 16进制颜色值的正则
            const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/;
            // 把颜色值变成小写
            let color = val.toLowerCase();
            if (reg.test(color)) {
                // 如果只有三位的值，需变成六位，如：#fff => #ffffff
                if (color.length === 4 || color.length === 5) {
                    let colorNew = '#';
                    for (let i = 1; i < color.length; i += 1) {
                        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                    }
                    color = colorNew;
                }
                // 处理六位的颜色值，转为RGB
                const colorChange = [];
                for (let i = 1; i < 7; i += 2) {
                    colorChange.push(parseInt(`0x${color.slice(i, i + 2)}`)); // eslint-disable-line   radix
                }
                if (color.length === 7) {
                    colorChange.push(1);
                } else if (color.length === 9) {
                    colorChange.push(parseInt(`0x${color.slice(7, 9)}`) / 255); // eslint-disable-line   radix
                }
                return `rgba(${colorChange.join(',')})`;
            }
            return color;
        },
        calcStyle(configItem) {
            const style = {
                display: 'block',
            };
            if (!configItem.link) {
                return style;
            }
            if (configItem.link && this.form[configItem.link] === configItem.linkValue) {
                return style;
            }
            style.display = 'none';
            return style;
        },
    },
};
</script>

<style scoped lang='less'>
.FormIteminblock {
    margin-right: 10px;
    margin-bottom: 16px !important;
    display: flex;
    justify-content: flex-start;

    /deep/ .ivu-form-item-label {
        width: 120px !important;
        // padding: 0 12px 0 0;
        box-sizing: border-box;
        height: 30px;
        line-height: 30px;
        display: flex;
    }
}

.labelStyle {
    display: flex;
    justify-content: flex-start;
    padding-bottom: 16px !important;

    /deep/.ivu-form-item-label {
        display: flex;
        line-height: 30px;
        font-size: 12px;
        padding: 0px;
        // width: 120px !important;
        flex: 0 0 120px;
    }
}
</style>
