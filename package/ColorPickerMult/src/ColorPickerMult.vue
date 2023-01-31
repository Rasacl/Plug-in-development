<style type="text/css" scoped>
.color {
    height: 18px;
    width: 18px;
}
.highLight {
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
}
.colorPanel {
    user-select: none;
    width: 228px;
    position: fixed;
    z-index: 99999;
    margin-left: 10px;
    /* background: #444a52; */
    background: #fff;
    border-radius: 2px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    display: inline-block;
    padding: 0px;
}
.colorTab {
    width: 212px;
    height: 26px;
    background: #ffffff;
    margin: 6px 8px 9px;
    border-radius: 4px;
}
.colorTab .oneTab {
    /* width: 94px; */
    width: 50%;
    height: 100%;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    /* border-radius: 2px 0 0 2px; */
    /* border-right: 1px solid rgba(34, 34, 34, 1); */
    float: left;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    color: #333333;
    letter-spacing: 0.2px;
    /* border: 1px solid #f0f0f0; */
}
.colorTab .singleColor {
    border-radius: 4px 0 0 4px;
    border-right: none;
}
.colorTab .gradientColor {
    border-radius: 0 4px 4px 0;
    border-left: none;
}
.colorTab .active {
    /* background: #bfbfbf; */
    color: #ff7a1e;
    border: 1px solid #ff7a1e;
    /* border-radius: 4px; */
}
.background {
    width: inherit;
    position: relative;
    /* margin-top: 5px; */
    background: #fff;
    /* border-top: 1px solid #dcdee2; */
}
.displayColor1 {
    /*padding-right: 10px;*/
    width: 61%;
    /* float: right; */
    position: absolute;
    right: 12px;
    margin: 0;
}
.displayColor2 {
    /*padding-right: 10px;*/
    width: 59px;
    height: 32px;
    float: right;
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    background: rgba(255, 255, 255);
    border: 1px solid rgba(224, 224, 224);
    border-radius: 2px;
}
.configName {
    display: inline-block;
    /* float: left; */
    color: rgb(255 255 255);
}
.zhanwei {
    padding: 9px 0;
    overflow: hidden;
    float: right;
    margin-right: 0px;
}
.background .TipBox {
    margin-right: 12px;
    text-align: right;
    padding: 8px 8px;
    width: inherit;
    overflow: hidden;
}
.headerBar0 {
    width: inherit;
    height: 22px;
    line-height: 22px;
    position: relative;
    /* padding-top: 10px; */
}
.background .button {
    width: 40px;
    height: 22px;
    border-radius: 2px;
    border: 0px;
}
.background .confirm {
    background: #157eff;
}
.background .cancle {
    opacity: 0.8;
    margin-right: 8px;
    background: rgb(203 229 255 / 10%);
}
.TipBox > button {
    width: 52px;
    height: 26px;
    border-radius: 4px;
}
</style>
<style>
/* .collapse-content {
  height: 0;
  width: 204px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #202020;
  transition: height 0.5s ease-out;
  transition-delay:10ms;
} */
.alphaColorPicker .vc-chrome-alpha-wrap,
.alphaColorPicker .vc-chrome-field:last-child {
    display: block;
}
.ColorPicker .vc-chrome-alpha-wrap,
.ColorPicker .vc-chrome-field:last-child {
    display: none;
}
.alphaColorPicker .vc-chrome-hue-wrap {
    margin-top: 0px;
}
.ColorPicker .vc-chrome-hue-wrap {
    margin-top: 8px;
}
#colorPickerMult .down-arrow > .ivu-select-arrow {
    right: 2px;
}
.TipBox .ivu-btn > span {
    vertical-align: top;
}
</style>
<template>
    <div id="colorPickerMult" style="max-width: 235px;margin: 0 auto;background:content-box; width:147px;height:40px; float:left;">
        <!-- 头部--包含名称和颜色展示 -->
        <div v-show="tools.isShowHeader" ref="reference" span="16" class="backcolor headerBar0 "  :style="headerStyle">
            <!-- 如果传入名字了就显示名字，不传就不显示    'highLight':show  153行 -->
            <span span="8" v-if="showConfigName" class="configName">{{ configName }}</span>
            <button @click="change($event)" type="button" :class="{'displayColor1':showConfigName,'displayColor2':!showConfigName,}" class="ivu-btn ivu-btn-default ivu-btn-small normal-btn ">
                <div>
                    <div class="color calc-width" :class="{'wide':isWide}" :style="displayColorValue"></div>
                    <div class="down-arrow mt-1">
                        <Icon class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow" />
                    </div>
                </div>
            </button>
        </div>

        <!-- 内容 -->
        <div class="colorPanel" ref="popper" v-if="show" :style="panelPositionStyle">
            <div class="colorTab" v-if="hasClassified">
                <p class="oneTab singleColor" v-show="tools.isHasSolid" data-name="Solid" @click="changeClassification($event)" :class="{ active:type == 'Solid' }">
                    <span>单色</span>
                </p>
                <p class="oneTab gradientColor" v-show="tools.gradientOrSubsection == 'gradient'" data-name="Gradient" @click="changeClassification($event)" :class="{ active:type == 'Gradient' }">
                    <span>渐变</span>
                </p>
                <p class="oneTab" v-show="tools.gradientOrSubsection == 'subsection'" data-name="subsection" @click="changeClassification($event)" :class="{ active:type == 'subsection' }">
                    <span>分段</span>
                </p>
            </div>
            <div class="colorContent">
                <div v-show="(hasClassified &&type == 'Solid') || (!hasClassified && tools.isHasSolid) " style="height: auto;width: inherit;margin: 0 8px;">
                    <chrome-picker :class="tools.alpha?'alphaColorPicker':'ColorPicker'" @input="changeSolidColor" :value="solidColor" :capture="true" class="color-picker" v-model="solidColor" />
                </div>
                <div v-if="tools.gradientOrSubsection == 'gradient' || tools.gradientOrSubsection == 'subsection'" v-show="(hasClassified &&(type == 'Gradient'||type == 'subsection'))|| !hasClassified" style="height:auto">
                    <ColorPS :show="(hasClassified &&(type == 'Gradient'||type == 'subsection'))||!hasClassified" name="渐变" id="colorPS" maxLength="8" :tools="tools" :gradientOrSubsection="tools.gradientOrSubsection" :ref="'colorPS2'" :colors="grayFilterColorBar" :position="grayFilterPerBar" v-on:on-change="changeColor" />
                </div>

            </div>

            <div class="background">
                <div v-if="tools.isShowBottomButton" class="TipBox">
                    <Button type="primary" size="small" @click="ok">确认</Button>
                    <Button size="small" class="mr-8" @click="cancel" style="margin-left: 5px;">取消</Button>

                </div>
                <div v-else class="TipBox zhanwei">

                </div>
            </div>
        </div>

    </div>

</template>
<script type="text/javascript">
import { Chrome } from 'vue-color';
import ColorPS from '../../ColorPS2';
import {deepCopy, rgbaToColor} from '../../../public/utils';
const Popper = require('popper.js/dist/umd/popper.js');

export default {
    name:'ColorPickerMult',
    props: {
        headerStyle: {
            type: String,
            default: 'width: 69%;margin-left: auto;position: relative;rgb(45 51 59);',
        },
        color: '', // 目前颜色值只接受字符串和对象两种1.rgba(44,207,1,0.4) 2.{"0.33":"rgba(233,35,240,0.14)","0.66":"rgba(235,71,71,0.84)"}
        colorBar: {},
        posBar: {},
        configName: '',
        tools: { // 相关的配置信息
            type: Object,
            default: () => ({
                isShowHeader: true, // 是否显示头部（包含名称和颜色带展示）
                // hasClassified:false,    // 是否有分类，false代表只有一种
                isHasSolid: false, // 是否需要显示常规拾色器
                gradientOrSubsection: '', // 渐变色的类型是“gradient（渐变）”，“subsection（分段）”，“空字符串（代表不需要渐变色组件）”
                isShowBottomButton: true, // 是否展示底部（确认，取消按钮）
                alpha: true, // 是否展示透明度条
            }),
        },
        isWide: {
            type: Boolean,
            default: false,
        },
        parentValue: '',
        idx: {
            type: Number,
            default: 0,
        },

    },
    data() {
        return {
            popper:null,
            popperStatus:false,
            hasClassified: false, // 是否有分类
            colorObject: {},
            showConfigName: false,
            originData: '',
            show: false,
            displayColorValue: '',
            config: {},
            solidColor: 'rgba(249,252,255,1)',
            type: 'Solid',
            linearBar: { 0: 'rgba(8, 21, 41,0.3)', 0.6: 'rgba(39, 73, 117,0.6)', 1: 'rgba(13, 24, 39,1)' },
            grayFilterPerBar: [0, 0.6, 1],
            grayFilterColorBar: [[8, 21, 41, 0.3], [39, 73, 117, 0.6], [13, 24, 39, 1]],
            itemstyleTemp: 'background: linear-gradient(90deg,&item)',
            itemstyleTempSub: 'background: linear-gradient(to right,&item)',
            panelPositionStyle: 'margin-left:0px;margin-top:0;',
            compWidth: 20,
        };
    },
    components: {
        'chrome-picker': Chrome,
        ColorPS,
    },
    created() {
        // this.config = this.data;
        // 如果没有传configName，就不显示标题名
        this.colorObject = this.color;
        if (!this.configName) {
            this.showConfigName = false;
        } else {
            this.showConfigName = true;
        }
        // 如果不需要显示header，将拾色器默认显示出来
        if (!this.tools.isShowHeader) {
            this.show = true;
        }

        if (!this.colorObject) {
            // colorObject不存在，使用colorBar,posBar,将这两处理成colorObject
            this.changePosColBarToColors();
        }
        this.parseColorBg(this.colorObject);

        // 判断是否有分类
        if (this.tools.isHasSolid && this.tools.gradientOrSubsection !== '') {
            this.hasClassified = true;
        }

        if (this.isSolidColor(this.colorObject)) {
            this.type = 'Solid';
            this.solidColor = this.colorObject;
            this.originData = this.solidColor;
        } else {
            this.type = 'Gradient';
            this.linearBar = this.colorObject;
            this.initBarPer(this.colorObject);
            this.originData = deepCopy(this.linearBar);
        }
    },
    beforeDestroy () {
               if (this.popper) {
                    this.popper.destroy();
                }
            },
    watch:{
      show(val){
        if(val){
         this.update();
      }else{
          this.destroy();
      }
      }
    },
    methods: {
        update(){
             if (this.popper) {
                    this.$nextTick(() => {
                        this.popper.update();
                        this.popperStatus = true;
                    });
                } else {
                    this.$nextTick(() => {
                        this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
                          modifiers: {
                                computeStyle:{
                                    gpuAcceleration: false
                                }
                            },
                            onCreate:()=>{
                                this.resetTransformOrigin();
                                this.$nextTick(this.popper.update());
                            },
                            onUpdate:()=>{
                                this.resetTransformOrigin();
                            }
                        });
                    });
                }
        
        },
        destroy () {
                if (this.popper) {
                    setTimeout(() => {
                        if (this.popper && !this.popperStatus) {
                            this.popper.destroy();
                            this.popper = null;
                        }
                        this.popperStatus = false;
                    }, 300);
                }
            },
        resetTransformOrigin() {
                // 不判断，Select 会报错，不知道为什么
                if (!this.popper) return;

                let x_placement = this.popper.popper.getAttribute('x-placement');
                let placementStart = x_placement.split('-')[0];
                let placementEnd = x_placement.split('-')[1];
                const leftOrRight = x_placement === 'left' || x_placement === 'right';
                if(!leftOrRight){
                    this.popper.popper.style.transformOrigin = placementStart==='bottom' || ( placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom';
                }
            },
        isSolidColor(color) {
            const flag = typeof (color) === 'string' || Array.isArray(color);
            return flag;
        },
        setPositionStyle(e) {
            const dom = e.currentTarget
            let isModal = false
            let DOMArr = Array.from(e.path)
            DOMArr.pop()
            DOMArr.pop()
            DOMArr.pop()
            let currentHeight = document.documentElement.clientHeight
            isModal = DOMArr.some(item => Array.from(item.classList).includes('ivu-modal-body'))
            if (isModal) {
                const ModelDom = DOMArr.filter(item => {
                    return Array.from(item.classList).includes('ivu-modal-body')
                })
                if (currentHeight - dom.getBoundingClientRect().top > 370) {
                    this.panelPositionStyle = `left:${dom.getBoundingClientRect().left - ModelDom[0].getBoundingClientRect().left - 9}px;top:${dom.getBoundingClientRect().top - ModelDom[0].getBoundingClientRect().top + dom.getBoundingClientRect().height + 54}px`;
                } else {
                    this.panelPositionStyle = `left:${dom.getBoundingClientRect().left - ModelDom[0].getBoundingClientRect().left - 9}px;top:${dom.getBoundingClientRect().top - ModelDom[0].getBoundingClientRect().top + dom.getBoundingClientRect().height - 364 + 22}px`;
                }
            } else {
                if (currentHeight - dom.getBoundingClientRect().bottom < 370) {
                   this.panelPositionStyle = `left:${dom.getBoundingClientRect().left - 9}px;top:${dom.getBoundingClientRect().top + dom.getBoundingClientRect().height - 412}px`;
                } else {
                   this.panelPositionStyle = `left:${dom.getBoundingClientRect().left - 9}px;top:${dom.getBoundingClientRect().top + dom.getBoundingClientRect().height + 4}px`;
                }
            }
        },
        changePosColBarToColors() {
            const object = {};
            this.posBar.sort();
            this.posBar.forEach((p, i) => {
                object[p] = this.colorBar[i];
            });
            this.colorObject = object;
        },
        change(e = null) {
            if (e !== null) {
                this.setPositionStyle(e);
            }
            if (this.show) {
                // 当前是显示，要隐藏
                this.spread = false;
                this.classificationShow = false;
                setTimeout(() => {
                    this.show = false;
                }, 10);
            } else {
                // 当前是隐藏，要隐藏显示
                this.show = true;

                setTimeout(() => {
                    this.spread = true;
                    this.$emit('updateScrollTop');
                    this.$emit('closeOtherClassify', this.idx);
                }, 10);
            }
        },

        parseColorBg(colorData) {
            if (this.isSolidColor(colorData)) {
                if (typeof colorData === 'string') {
                    this.displayColorValue = `background:${colorData}`;
                } else {
                    let color;
                    if (colorData.length === 3) {
                        color = `rgba(${colorData.join()},1)`;
                    } else if (colorData.length === 4) {
                        color = `rgba(${colorData.join()})`;
                    }
                    this.displayColorValue = `background:${color}`;
                }
                return;
            }

            let keys = Object.keys(colorData);
            keys = keys.map((item) => item - 0);
            keys.sort();

            const itemTemp = '&col &per%';
            const itemstyle = [];

            if (this.tools.gradientOrSubsection == 'subsection') {
                for (let i = 0; i < keys.length; i++) {
                    let percent = keys[i] * 100;
                    let color = colorData[keys[i]];
                    if (typeof color !== 'string') {
                        if (color.length === 3) {
                            color = `rgba(${color.join()},1)`;
                        } else if (color.length === 4) {
                            color = `rgba(${color.join()})`;
                        }
                    }
                    let nextI;
                    if (i === 0 && percent !== 0) {
                        itemstyle.push(itemTemp.replace('&col', color).replace('&per', 0));
                    }
                    if (i + 1 == keys.length) {
                        nextI = i;
                        percent = 100;
                    } else {
                        nextI = i + 1;
                    }
                    const nextcolor = colorData[`${keys[nextI]}`];
                    itemstyle.push(itemTemp.replace('&col', color).replace('&per', percent));
                    itemstyle.push(itemTemp.replace('&col', nextcolor).replace('&per', percent));
                }
                const template = this.itemstyleTempSub;
                this.displayColorValue = template.replace('&item', itemstyle.join(','));
            } else if (this.tools.gradientOrSubsection == 'gradient') {
                for (let i = 0; i < keys.length; i++) {
                    const percent = keys[i] * 100;
                    let color = colorData[keys[i]];
                    if (typeof color !== 'string') {
                        if (color.length === 3) {
                            color = `rgba(${color.join()},1)`;
                        } else if (color.length === 4) {
                            color = `rgba(${color.join()})`;
                        }
                    }
                    itemstyle.push(itemTemp.replace('&col', color).replace('&per', percent));
                }
                const template = this.itemstyleTemp;
                this.displayColorValue = template.replace('&item', itemstyle.join(','));
            }
        },
        recoverColor(val) {
            if (this.isSolidColor(val)) {
                this.type = 'Solid';
                this.solidColor = val;
            } else {
                this.type = 'Gradient';
                this.initBarPer(val);
                this.$refs.colorPS2.refresh(this.grayFilterColorBar, this.grayFilterPerBar);
            }
        },
        initBarPer(selectColor) {
            const filter = selectColor;
            let keys = Object.keys(filter);
            this.grayFilterColorBar = [];
            keys = this.grayFilterPerBar = keys.map((item) => item - 0);
            keys.sort();
            for (let i = 0; i < keys.length; i++) {
                let color = filter[`${keys[i]}`];
                // 如果color是[255, 0, 0]
                if (typeof color === 'object') {
                    if (color.length == 3) {
                        color = `rgba(${color.join()},1)`;
                    } else if (color.length == 4) {
                        color = `rgba(${color.join()})`;
                    }
                } else {
                    if (color.indexOf('#') != -1) {
                        color = this.hexToRgb(color);
                    }
                    if (color.indexOf('rgba') < 0 && color.indexOf('rgb') > -1) {
                        color = color.replace('rgb', 'rgba').replace(')', ',1)');
                    }
                }

                color = rgbaToColor(color);
                this.grayFilterColorBar.push(color);
            }
        },
        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return `rgb(${parseInt(`0x${hex.slice(1, 3)}`)},${parseInt(`0x${hex.slice(3, 5)}`)},${parseInt(`0x${hex.slice(5, 7)}`)})`;
        },
        ok() {
            this.show = false;
            // if(typeof(this.colorObject) == 'string'){
            //   this.type = 'Solid';
            //   this.solidColor = this.colorObject;
            //   this.originData = this.solidColor ;
            // }else{
            //   this.type = 'Gradient';
            //   this.linearBar = this.colorObject;
            //   this.initBarPer(this.colorObject);
            //   this.originData = JSON.parse(JSON.stringify( this.linearBar));
            // }
            if (this.isSolidColor(this.colorObject)) {
                this.originData = this.colorObject;
            } else {
                this.originData = deepCopy(this.colorObject);
                this.initBarPer(this.originData);
            }
            this.$emit('confirm');
        },

        cancel() {
            this.show = false;
            this.parseColorBg(this.originData);
            if (this.isSolidColor(this.colorObject)) {
                this.$emit('cancel', { color: this.originData });
            } else {
                this.$emit('cancel', { color: this.originData, colorBar: this.grayFilterColorBar, posBar: this.grayFilterPerBar });
            }
            this.recoverColor(this.originData);
        },
        changeSolidColor(v) {
            if (v.rgba) {
                const RGBAStr = `rgba(${
                    v.rgba.r
                    },${
                    v.rgba.g
                    },${
                    v.rgba.b
                    },${
                    v.rgba.a
                    })`;
                this.colorObject = RGBAStr;
                this.changeSingleColor(RGBAStr);

                this.parseColorBg(RGBAStr);
            }
        },
        changeColor(object) {
            const color = {};
            let resultColor = {};
            if (object.color) {
                this.linearBar = object.color;
                resultColor = object;
            } else {
                object.posBar.forEach((bar, i) => {
                    color[bar] = object.colorBar[i];
                });
                resultColor = object;
                resultColor.color = color;
                this.linearBar = color;
            }
            this.colorObject = this.linearBar;
            this.changeLinearColor(resultColor);
            this.parseColorBg(this.linearBar);
        },
        changeClassification(event) {
            this.type = event.currentTarget.getAttribute('data-name');
            this.$emit('changeType', this.type)
            if (this.type == 'Gradient') {
                this.initBarPer(this.linearBar);
                const color = [];
                for (let i = 0; i < this.grayFilterColorBar.length; i++) {
                    const c = this.grayFilterColorBar[i];
                    if (c.length == 3) {
                        color.push(`rgba(${c.join()},1)`);
                    } else if (c.length == 4) {
                        color.push(`rgba(${c.join()})`);
                    }
                }

                this.changeLinearColor({ color: this.linearBar, colorBar: color, posBar: this.grayFilterPerBar });
                this.parseColorBg(this.linearBar);
            } else {
                this.changeSingleColor(this.solidColor);
                this.parseColorBg(this.solidColor);
            }
        },
        changeSingleColor(color) {
            if (this.parentValue != undefined && this.parentValue != '') {
                this.$emit('changeSingleColor', this.parentValue, { color });
            } else {
                this.$emit('changeSingleColor', { color });
            }
        },
        changeLinearColor(color) {
            if (this.parentValue != undefined && this.parentValue != '') {
                this.$emit('changeLinearColor', this.parentValue, color);
            } else {
                this.$emit('changeLinearColor', color);
            }
        },
    },
};
</script>
