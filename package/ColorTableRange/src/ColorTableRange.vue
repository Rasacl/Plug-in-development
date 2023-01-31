<template>
    <div>
        <Button @click="show=true">配置</Button>
        <modal v-model="show" title="颜色配置" :mask-closable="false" :width="460" @on-cancel="cancel">
            <div style="padding:10px 0;">
                <div class="lineheader ltitle">
                    取值范围
                </div>
                <div class="lineheader" style="padding:6px;height:40px;">
                    <div style="float:left;width:50%">
                        最小值:
                        <InputNumber v-model="form.min" />
                    </div>
                    <div style="float:left;width:50%">
                        最大值:
                        <InputNumber v-model="form.max" />
                    </div>
                </div>
                <div class="lineheader ltitle">
                    颜色分级
                </div>
                <div class="lineheader">
                    <div class="columns">数值条件</div>
                    <div class="columns">数值大小</div>
                    <div class="columns">颜色</div>
                    <div class="action">操作</div>
                </div>
                <div class="line" v-for="(col,index) in form.steps" :key="index">
                    <div class="columns">
                        <Select v-model="col.condition">
                            <Option value="<">&lt;</Option>
                            <Option value="<=">&lt;=</Option>
                            <Option value="=">=</Option>
                        </Select>
                    </div>
                    <div class="columns">
                        <InputNumber v-model="col.value" style="width:114px" />
                    </div>
                    <!-- col.gradientRamp为true就渲染颜色渐变器组件，不传或者false渲染纯色组件 -->
                    <div class="columns" v-if="!col.gradientRamp">
                        <ColorPicker v-model="col.color" :alpha="conf.alpha" @on-change="(val) => changeColorFormat(val,index)" />
                    </div>
                    <!-- 颜色渐变器 -->
                    <div class="columns" v-if="col.gradientRamp">
                        <ColorPickerMult v-if="true" class="line-height-21" :ref="'colorPickerMult'" @changeSingleColor="(v) => changeSingleColor(v,index)" :headerStyle="'width:59px;height: 32px;left: 0;position: relative;display: inline-block;padding: 0;top: 4px;'" @changeLinearColor="(obj) =>changeLinearColor(obj,index)" @confirm="colorPickConfirm(index)" @cancel="colorPickCancel(index)" :color="col.colorGradient.data.single.value" :tools="colorPick.colorMultSetting" />
                    </div>
                    <div class="action">
                        <Button custom-icon="iconfont icon-shanchu1" @click="deletelline(index)"></Button>
                    </div>
                </div>
                <div class="line">
                    <Button custom-icon="iconfont icon-zengjia" @click="addline()">增加</Button>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="ok">确定</Button>
                <Button @click="cancel">取消</Button>
            </div>
        </modal>
    </div>
</template>

<script>

import { clone } from '../../../public/utils';
import ColorPickerMult from '../../ColorPickerMult';

export default {
    name:'ColorTableRange',
    components: {
        ColorPickerMult,
    },
    data() {
        return {
            show: false,
            form: {
                min: 0,
                max: 0,
                steps: [],
            },
            // 颜色渐变器数据
            colorPick: {
                colorMultSetting: {
                    isShowHeader: true, // 是否显示头部（包含名称和颜色带展示）
                    isHasSolid: true, // 是否需要显示常规拾色器
                    gradientOrSubsection: 'gradient', // 渐变色的类型是“gradient（渐变）”，“subsection（分段）”，“空字符串（代表不需要渐变色组件）”
                    isShowBottomButton: true, // 是否展示底部（确认，取消按钮）
                    alpha: true, // 是否展示透明度条
                },
                data: {
                    type: '',
                    single: {
                        value: { 0.33: 'rgba(233,35,240,0.14)', 0.66: 'rgba(235,71,71,0.84)' },
                        TSvalue: [],
                    },
                },
                classification: 'single',
            },
        };
    },
    model: {
        prop: 'value',
        event: 'onChange',
    },
    props: {
        conf: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: Object,
            default: () => ({}),
        },
    },
    watch: {
        value: {
            handler() {
                this.form = clone(this.value);
                this.convertGradientRampData();
            },
            deep: true,
        },
    },
    mounted() {
        this.form = clone(this.value);
        this.convertGradientRampData();
    },
    methods: {
        ok() {
            let can = true;
            this.form.steps.forEach((item, index) => {
                if (item.value < this.form.min || item.value > this.form.max) {
                    this.$Message.error(`第${index + 1}项参数值不在范围内`);
                    can = false;
                }
            });
            if (!can) return;
            // this.value = clone(this.form);
            this.$emit('onChange', clone(this.form));
            this.show = false;
        },
        cancel() {
            this.form = clone(this.value);
            this.convertGradientRampData();
            this.show = false;
        },
        addline() {
            if (this.form.steps[0]?.gradientRamp) {
                this.form.steps.push({
                    condition: '<',
                    value: this.form.min,
                    colorGradient: {
                        classification: 'single',
                        colorMultSetting: {
                            alpha: true,
                            gradientOrSubsection: 'gradient',
                            isHasSolid: true,
                            isShowBottomButton: true,
                            isShowHeader: true,
                        },
                        data: {
                            type: 'single',
                            single: {
                                TSvalue: [],
                                value: 'rgba(255,255,255,1)',
                            },
                        },
                    },
                    color: '#FFFFFF',
                    gradientRamp: true,
                });
            } else {
                this.form.steps.push({ condition: '<', value: this.form.min, color: '#FFFFFF' });
            }
        },
        deletelline(index) {
            this.form.steps.splice(index, 1);
        },
        // 转换数据
        convertGradientRampData() {
            this.form.steps.forEach((item) => {
                if (item.gradientRamp) {
                    if (item.color.constructor === Object) {
                        this.colorPick.data.single.value = {};
                        item.color.intervals.forEach((itemCol, index) => {
                            this.colorPick.data.single.value[itemCol] = this.colorRgb(item.color.values[index]);
                        });
                    } else {
                        this.colorPick.data.single.value = this.colorRgb(item.color);
                    }
                    item.colorGradient = JSON.parse(JSON.stringify(this.colorPick));
                }
            });
        },
        // 颜色组件 当设置透明值时是rgb需要转为16进制
        changeColorFormat(val, index) {
            if (val.includes('rgba')) {
                this.form.steps[index].color = this.rgbaToHex(val);
            }
        },
        // 颜色渐变器
        changeSingleColor(v, index) {
            const RGBAObj = v.color;
            if (this.form.steps[index].colorGradient.classification === 'single') {
                if (RGBAObj.rgba) {
                    const RGBAStr = `rgba(${RGBAObj.rgba.r},${RGBAObj.rgba.g},${RGBAObj.rgba.b},${RGBAObj.rgba.a})`;
                    this.form.steps[index].colorGradient.data.type = 'single';
                    this.form.steps[index].colorGradient.data.single.value = RGBAStr;
                    // = this.selectColors.rgba = RGBAStr;
                } else if (RGBAObj.indexOf('rgba') !== -1) {
                    this.form.steps[index].colorGradient.data.type = 'single';
                    this.form.steps[index].colorGradient.data.single.value = RGBAObj;
                }
                // this.$parent.setColorPS(this.selectColors);
            }
        },
        changeLinearColor(object, index) {
            this.form.steps[index].colorGradient.data.type = 'single';
            this.form.steps[index].colorGradient.data.single.value = object.color;
        },
        colorPickConfirm(index) {
            const val = this.form.steps[index].colorGradient.data.single.value;
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
                this.form.steps[index].color = {
                    values: [],
                    intervals: [],
                    gradientType: '',
                };
                arr.forEach((item) => {
                    this.form.steps[index].color.values.push(map.get(item));
                });
                this.form.steps[index].color.intervals = arr;
                this.form.steps[index].color.gradientType = 'vertical';
            } else {
                this.form.steps[index].color = this.rgbaToHex(val);
            }
        },
        colorPickCancel(index) {
            this.form.steps[index].colorGradient.data.single.value = JSON.parse(JSON.stringify(this.form.steps[index].color));
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
            return `#${
                (`0${r.toString(16)}`).slice(-2)}${(`0${g.toString(16)}`).slice(-2)}${(`0${b.toString(16)}`).slice(-2)}${(`0${aToSixteen.toString(16)}`).slice(-2)}`;
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
        // 颜色渐变器
    },
};
</script>

<style lang="less" scoped>
@import "~@uino/kiss-ui/src/styles/custom.less";

/deep/ .ivu-modal-body {
    padding: 0 20px;
}
.lineheader {
    height: 30px;
    line-height: 30px;
    padding: 0 6px;
}
.ltitle {
    border-left: 2px solid #ff7a1e;
    padding-left: 5px;
    height: 20px;
    line-height: 20px;
}
.line {
    padding: 0 6px;
    height: 40px;
    line-height: 40px;
}
// /deep/ button > i {
//     font-size: 14px;
// }
.columns {
    width: 30%;
    float: left;
    padding-right: 10px;
}
.action {
    width: 10%;
    float: left;
    button {
        padding: 5px 6px;
        height: 30px;
        width: 30px;
        background: #e1e1e1;
        border: 1px solid #e1e1e1;
    }
}
</style>
