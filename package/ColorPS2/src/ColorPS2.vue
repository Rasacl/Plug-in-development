<style type="text/css" scoped>
.colorMult .mustSameWidth {
    width: calc(100% - 65px);
    line-height: 18px;
}
.colorMult .sameField {
    height: 8px;
    /* margin-left: 10px; */
}
.field {
    /* width: 190px;
	     height: 20px;
	     margin-left: 3px; */
    position: relative;
    /* vertical-align: middle; */
    cursor: pointer;
    /*z-index: -1;*/
    border-radius: 5px;
    border: 1px solid rgba(228, 228, 228, 1);
    width: 169px;
    margin-left: 5px;
}
.mouseArea {
    /* width: 192px;
  height: 20px;
  margin-left: 3px; */
    margin-top: -8px;
    top: 0px;
    position: relative;
}

.marker:hover {
    height: 60px;
}
.marker {
    top: 0;
    z-index: 777;
}
.colorTape {
    /* background: linear-gradient(to bottom,
	transparent 40%, #ECECEC 45%,#ffffff 50%, #ECECEC 55%, transparent 60%);
	height: 20px;
	position: absolute;
	z-index: 0;
	width: 208px; */
}
.marker-box {
    height: 1px;
    display: block;
    transform: scale(0.999);
    margin-left: 5px;
}
.marker-box > * {
    position: absolute;
    z-index: 10;
    top: -12px;
    margin-left: 4px;
}
.marker-active {
    top: -11.5px;
    z-index: 777;
    margin-left: 2px;
}
.marker-item-active {
    width: 14px;
    height: 14px;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5);
    border: 3px solid rgba(228, 228, 228, 1);
}
.marker-item {
    width: 10px;
    height: 10px;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(228, 228, 228, 1);
}
.color-picker {
    margin: auto;
    background: #fff;
    padding-top: 1px;
}
.curInput {
    width: 38px;
    position: absolute;
    right: 10px;
    top: -3px;
}
.percentIcon {
    /* display: inline-block; */
    display: none;
    position: absolute;
    top: 3px;
    right: 11px;
    font-size: 12px;
    -webkit-transform: scale(0.85);
    transform: scale(0.85);
}
.curInputBox {
    color: #333333;
    width: 40px;
    height: 26px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e0e0e0;
    float: right;
    margin-top: -15px;
    margin-right: 10px;
    text-align: left;
    padding-left: 5px;
}
.curInputBox:focus-visible {
    border: 1px solid #e0e0e0;
    outline: white;
}
</style>
<style type="text/css">
/*样式覆盖*/
.vc-chrome {
    box-shadow: none !important;
    width: 100% !important;
}
.color-picker > div.vc-chrome-saturation-wrap {
    /* width: 188px; */
    width: auto;
    height: 146px;
    background: #444a52;
    margin-bottom: 13px;
}
.vc-chrome > .vc-chrome-body {
    background-color: #fff;
    padding: 0px 10px 13px 0px;
}
.vc-chrome-fields .vc-input__input {
    color: #333 !important;
    background-color: #ffffff;
    border: 1px solid #e0e0e0 !important;
    height: 26px !important;
    border-radius: 4px !important;
    box-shadow: none !important;
    /* opacity: 0.5; */
}
.vc-chrome-toggle-btn {
    /*display: none;*/
}
.vc-chrome-toggle-btn > .vc-chrome-toggle-icon-highlight {
    display: none;
}
div > .color-picker {
    padding-top: 1px;
    background: #fff;
}
.vc-chrome > .vc-chrome-body > .vc-chrome-fields-wrap {
    padding-top: 9px;
}
.vc-chrome-color-wrap > .vc-chrome-active-color {
    position: relative;
    /* width: 26px;
  height: 26px; */
    overflow: hidden;
    z-index: 1;
    border-radius: 4px;
    border: 1px solid rgba(224, 224, 224, 1);
}
.vc-chrome-color-wrap > .vc-checkerboard {
    /* width: 26px!important;
  height: 26px!important; */
    border-radius: 4px !important;
}
.vc-chrome-sliders .vc-chrome-hue-wrap {
    height: 8px;
    border-radius: 5px;
    border: 2px solid rgba(228, 228, 228, 1);
}
.vc-chrome-sliders .vc-chrome-alpha-wrap {
    height: 8px;
    border-radius: 5px;
    border: 2px solid rgba(228, 228, 228, 1);
}
.vc-hue-pointer > .vc-hue-picker,
.vc-chrome-alpha-wrap > .vc-alpha-picker {
    width: 10px;
    height: 10px;
    border: 2px solid rgba(228, 228, 228, 1);
}
.vc-chrome-hue-wrap .vc-hue-picker,
.vc-chrome-alpha-wrap .vc-alpha-picker {
    width: 10px !important;
    height: 10px !important;
    top: -2px;
    position: relative;
}
.vc-chrome-color-wrap > .vc-chrome-active-color {
    position: relative;
    overflow: hidden;
    z-index: 1;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    border: 1px solid rgba(224, 224, 224, 1);
}
.vc-chrome-color-wrap > .vc-checkerboard {
    width: 26px !important;
    height: 26px !important;
}
.vc-chrome-toggle-btn {
    display: none;
}
.vc-chrome-fields-wrap > .vc-chrome-fields:nth-child(1),
.vc-chrome-fields-wrap > .vc-chrome-fields:nth-child(1) > .vc-chrome-field {
    width: 72px;
    flex: 0;
    display: block;
}
.vc-chrome-fields-wrap > .vc-chrome-fields:nth-child(2) {
    display: flex !important;
    margin-left: 0px;
    flex: 1;
}
.vc-chrome-fields .vc-input__label {
    margin-top: 5px !important;
    /* transform: scale(0.85); */
    color: #333 !important;
    font-size: 10px !important;
}
.vc-chrome-fields-wrap .vc-chrome-field {
    padding-left: 4px;
}
.colorMult-border {
    width: 97%;
    height: 29px;
    /* border: 1px solid #ccc; */
    position: absolute;
    top: -2px;
    z-index: -10;
}
</style>
<template>
    <div class="colorMult" style="position: relative;margin-right: 0px;margin-left: 8px;padding-top:8px;min-height: 273px;">
        <!-- <div class="colorMult-border"></div> -->
        <div class="field sameField mustSameWidth" :style="colorBandStyle">
            <div class="colorTape" style=""></div>
        </div>

        <div class="mouseArea sameField mustSameWidth" id="mouseArea" @mousemove="drag" @click="addMarker"></div>
        <input class="curInputBox" autocomplete="off" :transfer="true" placeholder="请输入数字" v-model="curInput" @focus="foucusInput" @blur="blurInput" />
        <div class="percentIcon">
            <span>%</span>
        </div>
        <div class="marker-box mustSameWidth">
            <div :class="index != curIndex ? 'marker':'marker-active'" v-for="(v,index) in colorMarkers" :style="v.style" @mousedown="dragStart($event,index)" @contextmenu.prevent="deleteItem($event,index)" @click="editMarker($event,index)" :key="'multColor'+index">
                <Tooltip :transfer="true" placement="bottom" content="单击修改,右键删除">
                    <div :class="index != curIndex?'marker-item':'marker-item-active'" :style="calcMarkColor(v.color)"></div>
                </Tooltip>

            </div>
        </div>

        <div style="position: relative;z-index: 999; padding-top: 10px; margin-right: 8px;clear: both;">
            <chrome-picker :class="tools.alpha?'alphaColorPicker':'ColorPicker'" @input="onOk" :value="newColor" :capture="true" class="color-picker" v-model="newColor" alpha />
        </div>

    </div>
</template>
<script type="text/javascript">

import { Chrome } from 'vue-color';
import { deepCopy,throttle } from '../../../public/utils';

export default {
    name:'ColorPS2',
    props: ['colors', 'position', 'maxLength', 'gradientOrSubsection', 'show', 'tools'],
    mounted() {
        const col = this.colors;
        const pos = this.position;
        this.refresh(col, pos);
    },
    components: {
        'chrome-picker': Chrome,
    },
    watch: {
        colorMarkers: {
            handler(val, oldVal) {
                this.$data.colorBandStyle = this.parseColorBg(val);
                if (this.firstFlag) {
                    this.firstFlag = false;
                    return;
                }
                if (this.show) {
                    this.colorChanged(val);
                }
            },
            deep: true,
        },
        curInput: {
            handler(val, oldVal) {
                if (this.isFocus) {
                    val -= 0;
                    if (val <= 0 || isNaN(val)) {
                        this.curInput = 0;
                    } else if (val > 100) {
                        this.curInput = 100;
                    } else {
                        this.changeMarkerPos(val);
                    }
                }
            },
        },
    },
    data() {
        return {
            itemstyleTemp: 'background: linear-gradient(90deg,&item)',
            itemstyleTempSub: 'background: linear-gradient(to right,&item)',
            curInput: '0',
            curIndex: 0,
            colorPannel: {
                visible: false,
                color: { r: 255, g: 0, b: 0 },
                index: 0,
            },
            dragState: {
                enable: false,
                index: 0,
                width: 10,
            },
            newColor: {
                r: 255, g: 0, b: 0, a: 1,
            },
            colorBandStyle: '',
            colorMarkers: [
                {
                    position: '0%',
                    color: 'rgba(255,0,0,1)',
                    style: 'left:0%;',

                },
                {
                    position: '10%',
                    color: 'rgba(255,255,255,1)',
                    style: 'left:10%;',
                },
                {
                    position: '20%',
                    color: 'rgba(0,255,255,1)',
                    style: 'left:20%;',
                },
                {
                    position: '100%',
                    color: 'rgba(0,0,255,1)',
                    style: 'left:100%;',
                },
            ],
            myColors: '',
            isFocus: false,
            firstFlag: true,
        };
    },
    methods: {
        foucusInput(dd) {
            this.isFocus = true;
        },
        blurInput(dd) {
            this.isFocus = false;
        },
        refresh(col, pos) {
            this.setData(col, pos);
            this.$data.newColor = {
                r: col[0][0],
                g: col[0][1],
                b: col[0][2],
                a: col[0][3] ? col[0][3] : 1,
            };
            const v = pos[0] * 100;
            this.curInput = Number(v.toFixed());
        },
        setData(colors, position) {
            this.$data.colorMarkers = [];
            const that = this;
            colors.forEach((v, i, a) => {
                const tempPos = `${position[i] * 100}%`;
                that.$data.colorMarkers.push({
                    position: tempPos,
                    color: `rgba(${v[0]},${v[1]},${v[2]},${v[3]})`,
                    style: that.calcMark(tempPos),
                });
            });
            this.$data.newColor = {
                r: colors[0][0],
                g: colors[0][1],
                b: colors[0][2],
                a: colors[0][3],
            };
        },
        calcBand(val) {
            const valPosArr = [];
            const valObj = {};
            val.forEach((item, index, arr) => {
                const pos = parseInt(item.position);
                valPosArr.push(parseInt(item.position));
                valObj[pos] = item;
            });
            function compare(a, b) {
                return a - b;
            }
            valPosArr.sort(compare);

            let temp = '';
            valPosArr.forEach((item, index, arr) => {
                // 如果是最后一个元素就不加逗号进去了
                const itemVal = valObj[item];
                if (index != arr.length - 1) {
                    temp += (`${itemVal.color} ${itemVal.position},`);
                } else {
                    temp += (`${itemVal.color} ${itemVal.position}`);
                }
            });
            // val.forEach((item,index,arr) => {
            //   //如果是最后一个元素就不加逗号进去了
            //   if(index != arr.length-1){
            //     temp += (item.color + ' ' + item.position + ',');
            //   }else{
            //     temp += (item.color + ' ' + item.position );
            //   }
            // });
            const templete = `background:linear-gradient(90deg,${temp});`;
            return templete;
        },

        parseColorBg(val) {
            const colorPos = [];
            const colorVal = {};
            val.forEach((item, index, arr) => {
                const pos = parseInt(item.position);
                colorPos.push(parseInt(item.position));
                colorVal[pos] = item;
            });

            function compare(a, b) {
                return a - b;
            }
            colorPos.sort(compare);

            const keys = colorPos;
            const itemTemp = '&col &per%';
            const itemstyle = [];

            if (this.gradientOrSubsection == 'subsection') {
                for (let i = 0; i < keys.length; i++) {
                    let percent = keys[i];
                    const { color } = colorVal[`${keys[i]}`];
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
                    const nextcolor = colorVal[`${keys[nextI]}`].color;
                    itemstyle.push(itemTemp.replace('&col', color).replace('&per', percent));
                    itemstyle.push(itemTemp.replace('&col', nextcolor).replace('&per', percent));
                }
                const template = this.itemstyleTempSub;
                return template.replace('&item', itemstyle.join(','));
            } if (this.gradientOrSubsection == 'gradient') {
                for (let i = 0; i < keys.length; i++) {
                    const percent = keys[i];
                    const { color } = colorVal[`${keys[i]}`];
                    itemstyle.push(itemTemp.replace('&col', color).replace('&per', percent));
                }
                const template = this.itemstyleTemp;
                return template.replace('&item', itemstyle.join(','));
            }
        },
        calcMark(val) {
            const templete = `left:calc(${val} - 10px); width:0; height:0;`;
            return templete;
        },
        calcMarkColor(val) {
            const templete = `cursor:pointer;background-color: ${val};border-radius: 50%;z-index:999`;
            return templete;
        },
        deleteItem(e, val) {
            // if(val == 0 || val == (this.$data.colorMarkers.length - 1)){
            //   return;
            // }
            if (this.$data.colorMarkers.length <= 2) {
                return;
            }
            let next;
            this.onCancel();
            this.$data.colorMarkers.splice(val, 1);
            if (val == this.$data.colorMarkers.length) {
                next = this.$data.colorMarkers[val - 1];
            } else {
                next = this.$data.colorMarkers[val];
            }

            this.curInput = Number(next.position.split('%')[0]);
            // 修改颜色编辑器的颜色
            const colorGroup = next.color;
            this.$data.newColor = colorGroup;
        },
        /**
     * 颜色编辑器
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
        onCancel(val) {
            // this.$data.colorPannel.visible = false;
            // document.removeEventListener('click', this.onOk, false);
            document.removeEventListener('mouseup', this.dragEnd, false);
        },
        onOk(val) {
            // this.onCancel();
            // this.$data.colorPannel.visible = false;
            const { rgba } = val;
            if (rgba) {
                const myColor = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
                this.$data.colorMarkers[this.$data.colorPannel.index].color = myColor;
            }
        },
        /**
     * 以下为拖动相关操作
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
        dragStart(e, val) {
            // if(val == 0 || val == (this.$data.colorMarkers.length - 1)){
            //   return;
            // }
            if (e.button == 0) {
                this.$data.dragState.enable = true;
                this.$data.dragState.index = val;
                this.curIndex = val;
                document.addEventListener('mouseup', this.dragEnd, false);
            }
        },

        dragEnd(val) {
            if (val.button == 0) {
                this.onCancel();
                this.$data.dragState.enable = false;

                // let _colorMarkers = JSON.parse(JSON.stringify(val));
                // // 记录当前拖拽的色块的颜色值
                // let curDragColor = _colorMarkers[this.dragState.index].color;

                // // 将拖拽后的色带排序
                // _colorMarkers.sort(compare);
                // function compare (a, b){
                //   let prev = parseInt(a.position.match(/\d*/)[0]);
                //   let after = parseInt(b.position.match(/\d*/)[0]) ;
                //   return prev - after;
                // }
                // // 拖拽后，当前选择的色块的index可能会变化
                // var cuindex = _colorMarkers.findIndex(function (item) {
                //   return item.color === curDragColor;
                // });
                // this.$data.colorMarkers = _colorMarkers;
                // setTimeout(() => {
                //   this.colorPannel.index = cuindex;
                //   this.curIndex = cuindex;
                // }, 100);
            }
        },

        drag(e) {
            if (this.$data.dragState.enable == true) {
                if (e.target.id == 'mouseArea') {
                    let tempPos = Math.floor((e.offsetX / e.target.offsetWidth) * 100);
                    const curDragIndex = this.$data.dragState.index;
                    if (e.offsetX <= 7) {
                        tempPos = 0;
                    }
                    if (e.target.offsetWidth - e.offsetX <= 7) {
                        tempPos = 100;
                    }
                    let nextPos; let prevPos;
                    if (curDragIndex + 1 == this.$data.colorMarkers.length) {
                        nextPos = '100%';
                    } else {
                        nextPos = this.$data.colorMarkers[curDragIndex + 1].position;
                    }
                    if (curDragIndex == 0) {
                        prevPos = '0%';
                    } else {
                        prevPos = this.$data.colorMarkers[curDragIndex - 1].position;
                    }

                    // let nextPos = this.$data.colorMarkers[curDragIndex + 1].position;
                    // let prevPos = this.$data.colorMarkers[curDragIndex - 1].position;

                    nextPos = Number(nextPos.match(/\d*/)[0]);
                    prevPos = Number(prevPos.match(/\d*/)[0]);
                    // let nextPos = 100;
                    // let prevPos = 0;
                    // tempPos = (tempPos > nextPos ?  (nextPos - 1) : tempPos );
                    // tempPos = (tempPos < prevPos ?  (prevPos + 1) : tempPos );

                    this.$data.colorMarkers[this.$data.dragState.index].position = `${tempPos}%`;
                    this.$data.colorMarkers[this.$data.dragState.index].style = this.calcMark(`${tempPos}%`);

                    this.curInput = tempPos;
                }
            }
        },
        changeMarkerPos(val) {
            if (val == '' || val < 0) {
                val = 0;
            }
            if (val > 100) {
                val = 100;
            }
            this.$data.colorMarkers[this.curIndex].position = `${val}%`;
            this.$data.colorMarkers[this.curIndex].style = this.calcMark(`${val}%`);
        },
        /**
	 * 计算渐变颜色值 ARGB
	 * @param step 变化比率 0~100
	 * @param startColor  初始色值
	 * @param endColor 结束色值
	 * @return
	 */
        // 计算渐变过渡色
        gradient(startColor, endColor, step) {
            const sColor = startColor.match(/(\d(\.\d+)?)+/g);
            const eColor = endColor.match(/(\d(\.\d+)?)+/g);

            // 计算R\G\B每一步的差值
            const rStep = (eColor[0] - sColor[0]) / step;
            const gStep = (eColor[1] - sColor[1]) / step;
            const bStep = (eColor[2] - sColor[2]) / step;
            const oStep = (eColor[3] - sColor[3]) / step;

            const gradientColorArr = [];
            for (let i = 0; i < step; i++) {
                // 计算每一步的rgba值
                const col = [rStep * i + Number(sColor[0]), gStep * i + Number(sColor[1]), bStep * i + Number(sColor[2]), oStep * i + Number(sColor[3])];
                gradientColorArr.push(`rgba(${col.join()})`);
            }
            return gradientColorArr;
        },
        /**
     * 添加Marker操作
     * @param {[type]} val [description]
     */
        addMarker(val) {
            if (this.$data.colorMarkers.length >= Number(this.maxLength)) {
                return;
            }

            const that = this;
            // this.$data.colorPannel.visible = true;
            const { colorPannel } = this.$data;
            const position = Math.floor((val.offsetX / val.target.offsetWidth) * 100);
            const marks = this.$data.colorMarkers;
            const calcMark = this.calcMark(`${position}%`);
            this.curInput = position;
            this.$data.colorMarkers.every((v, i, a) => {
                const num = Number(v.position.match(/\d*/)[0]);
                if (position < num) {
                    colorPannel.index = i;
                    that.curIndex = i;

                    if (i == 0) {
                        a.splice(i, 0, {
                            position: `${position}%`,
                            color: a[i].color,
                            style: calcMark,
                        });
                        // 修改颜色编辑器的颜色
                        that.$data.newColor = a[i].color;
                    } else {
                        const colorArrFront = a[i - 1].color.match(/(\d(\.\d+)?)+/g);
                        const frontPos = Number(a[i - 1].position.match(/\d*/)[0]);
                        const frontCol = a[i - 1].color;
                        const colorArrBack = a[i].color.match(/(\d(\.\d+)?)+/g);
                        const backPos = Number(a[i].position.match(/\d*/)[0]);
                        const backCol = a[i].color;

                        // 获取当前点击处的颜色
                        // let clickColor=that.gradient(frontCol,backCol,backPos-frontPos)[position-frontPos];

                        const curPos = (position - frontPos) / (backPos - frontPos);
                        const ratio = {
                            r: Number(colorArrBack[0]) - Number(colorArrFront[0]),
                            g: Number(colorArrBack[1]) - Number(colorArrFront[1]),
                            b: Number(colorArrBack[2]) - Number(colorArrFront[2]),
                            a: Number(colorArrBack[3]) - Number(colorArrFront[3]),
                        };
                        const color = {
                            r: Number(colorArrFront[0]) + (ratio.r * curPos),
                            g: Number(colorArrFront[1]) + (ratio.g * curPos),
                            b: Number(colorArrFront[2]) + (ratio.b * curPos),
                            a: Number(colorArrFront[3]) + (ratio.a * curPos),
                        };
                        const clickColor = `rgba(${Math.floor(color.r)},${Math.floor(color.g)},${Math.floor(color.b)},${color.a})`;
                        a.splice(i, 0, {
                            position: `${position}%`,
                            color: clickColor,
                            style: calcMark,
                        });
                        // 修改颜色编辑器的颜色
                        that.$data.newColor = clickColor;
                    }
                    return false;
                }

                if (i == a.length - 1) {
                    colorPannel.index = a.length;
                    that.curIndex = a.length;

                    a.splice(i + 1, 0, {
                        position: `${position}%`,
                        color: a[i].color,
                        style: calcMark,
                    });
                }
                return true;
            });
        },
        /**
     * [editMarker description]
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
        editMarker(val, index) {
            val.stopImmediatePropagation();
            const pos = this.$data.colorMarkers[index].position;
            this.curInput = Number(pos.split('%')[0]);
            // this.$data.colorPannel.visible = true;
            this.$data.colorPannel.index = index;
            this.curIndex = index;

            const colorGroup = this.$data.colorMarkers[index].color;
            // 修改颜色编辑器的颜色
            this.$data.newColor = colorGroup;
        },

        colorChanged: throttle(function (val) {
            const _colorMarkers = deepCopy(val);

            // 将拖拽后的色带排序
            _colorMarkers.sort(compare);
            function compare(a, b) {
                const prev = parseInt(a.position.match(/\d*/)[0]);
                const after = parseInt(b.position.match(/\d*/)[0]);
                return prev - after;
            }

            const colors = [];
            const pos = [];
            const colorObj = {};
            _colorMarkers.forEach((v, i) => {
                colors.push(v.color);
                pos.push(v.position.match(/\d*/)[0] / 100);
                colorObj[pos[i]] = v.color;
            });
            const tmpData = { color: colorObj, colorBar: colors, posBar: pos };
            this.$emit('on-change', tmpData);
        }, null, this),

    },
};
</script>
