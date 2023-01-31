<template>
    <div style="margin-top:0px;">
        <div v-for="(item,index) in formList" :key="item.uuid">
            <div class="config-dec-indexblock">
                <div class="config-dec-indexblock-title">
                    {{conf.caption}}-{{index+1}}
                    <div style="float:right">
                        <Icon v-if="showClose" size="12" color="#666666" class="iconfont icon-shanchu" style="margin-right:10px;cursor: pointer; font-size: 25px;" @click="deleteblock(index)"/>
                        <Icon :ref="item.uuid+'arrow'" color="#666666" class="iconfont icon-xialajiantou1" style="cursor: pointer;font-size:20px" @click="changeblockstate(item.uuid)"/>
                    </div>
                </div>
                <FormConfig :ref="item.uuid" v-if="showConfig" :form="item" :DecoratorConfig="conf" uiContent="config" :maxblocklines="100" :alwaysblock="true"/>
            </div>
        </div>
        <Button v-if="showBtn" custom-icon="iconfont icon-zengjia" type="primary" @click="addBlock">添加</Button>
    </div>
</template>

<script>
import _ from 'lodash';
import { createUUID,getField } from '../../../public/utils';

export default {
    name:'indexBlock',
    components: {
        FormConfig: () => import('../../FormConfig'),
    },
    data() {
        return {
            showConfig: false,
            showClose: false,
            showBtn: false,
            formModal: null,
            formList: [],
        };
    },
    model: {
        prop: 'value',
        event: 'onChange',
    },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        conf: {
            type: Object,
            default: () => ({
                min: 0,
                max: 999,
                default: {},
                config: {},
            }),
        },
    },
    watch: {
        value: {
            handler(arr) {
                if (arr.length <= this.conf.min) {
                    this.showClose = false;
                } else {
                    this.showClose = true;
                }
                if (arr.length >= this.conf.max) {
                    this.showBtn = false;
                } else {
                    this.showBtn = true;
                }
                // console.info(arr, 'value');
            },
            deep: true,
            immediate: true,
        },
        formList: {
            handler(arr) {
                arr.forEach((item) => {
                    const value = this.value.find((val) => val.uuid === item.uuid);
                    Object.keys(item).forEach((key) => {
                        const rkey = key.split(',')[0];
                        const path = rkey.replace(/\//g, '.');
                        _.set(value, path, item[key]);
                    });
                });
                // console.info(arr, 'formList');
            },
            deep: true,
        },
    },
    mounted() {
        const pushitem = _.cloneDeep(this.conf.default);
        this.formModal = this.initconfig(pushitem);
        if (this.value.length < this.conf.min) {
            for (let index = 0; index < this.conf.min - this.value.length; index += 1) {
                this.addBlock();
            }
        }
        if (this.value.length > 0) {
            this.value.forEach((item) => {
                let uuid = '';
                if (!item.uuid) {
                    uuid = createUUID();
                    item.uuid = uuid;
                } else {
                    uuid = item.uuid;
                }
                if (!this.formList.find((u) => u.uuid === uuid)) {
                    const form = this.initconfig(item);
                    form.uuid = uuid;
                    this.formList.push(form);
                }
            });
        }
        this.showConfig = false;
        this.$nextTick(() => {
            this.showConfig = true;
        });
    },
    methods: {
        addBlock() {
            const pushitem = _.cloneDeep(this.conf.default);
            const uuid = createUUID();
            pushitem.uuid = uuid;
            this.value.push(pushitem);
            const form = _.cloneDeep(this.formModal);
            form.uuid = uuid;
            this.formList.push(form);
        },
        deleteblock(index) {
            this.value.splice(index, 1);
            this.formList.splice(index, 1);
        },
        changeblockstate(uuid) {
            const dom = this.$refs[uuid][0].$el;
            const arrow = this.$refs[`${uuid}arrow`][0].$el;
            if (dom.style.display === 'none') {
                dom.style.display = 'block';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                dom.style.display = 'none';
                arrow.style.transform = 'rotate(180deg)';
            }
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
        changeSelect(data, selection) {
            const key = data.value;
            const selectitem = selection.find((item) => item.key === key);
            if (selectitem.des && (selectitem.value || selectitem.value === '')) {
                this.form[selectitem.des] = selectitem.value;
                setTimeout(() => {
                    this.$refs[selectitem.des][0].$el.style.display = selectitem.showString ? 'flex' : 'none';
                }, 10);
            }
        },
        initconfig(pushitem) {
            // const pushitem = _.cloneDeep(this.conf.default);
            const config = _.cloneDeep(this.conf.config);
            const form = {};
            config.forEach((item) => {
                const curkey = form[item.des];
                // || item.type === 'color'
                if (!curkey && curkey !== false && curkey !== '' && curkey !== 0) {
                    if (item.des.indexOf(',') >= 0) {
                        const strArr = item.des.split(',');
                        if (item.gradientRamp) {
                            strArr.forEach((itemStrArr) => {
                                let val = getField(pushitem, itemStrArr);
                                // 用来存储改变格式的数据
                                const objVal = {};
                                if (typeof val === 'string') {
                                    val = this.colorRgb(val);
                                } else {
                                    val.intervals.forEach((itemVal, index) => {
                                        objVal[itemVal] = this.colorRgb(val.values[index]);
                                    });
                                    val = JSON.parse(JSON.stringify(objVal));
                                }
                                // 因为只有一个值，所以暂没去重  以及下面直接用的数组的第一个元素
                                if (!this.colorPick.data.single.TSvalue.includes(val) && this.colorPick.data.single.TSvalue.length < 2) {
                                    this.colorPick.data.single.TSvalue.push(val);
                                }
                            });
                            this.colorPick.data.single.value = this.colorPick.data.single.TSvalue[0]; // eslint-disable-line  prefer-destructuring
                            form[item.des] = this.colorPick.data.single.TSvalue[0]; // eslint-disable-line  prefer-destructuring
                        } else {
                            form[item.des] = getField(pushitem, strArr[0]);
                        }
                    } else {
                        form[item.des] = getField(pushitem, item.des);
                    }
                }

                if (item.gradientRamp) {
                    if (form[item.des].constructor === Object) {
                        this.colorPick.data.single.value = {};
                        form[item.des].intervals.forEach((itemCol, index) => {
                            this.colorPick.data.single.value[itemCol] = this.colorRgb(form[item.des].values[index]);
                        });
                    } else {
                        this.colorPick.data.single.value = this.colorRgb(form[item.des]);
                    }
                }
                // select控制其他组件
                if (item.type === 'select' && form[item.des]) {
                    this.changeSelect({ value: form[item.des] }, item.selection);
                }
            });
            return form;
        },
    },
};
</script>

<style scoped lang='less'>
@import "~@uino/kiss-ui/src/styles/custom.less";
.config-dec-indexblock {
    width: 440px;
    // background: #F9F9F9;
    border-radius: 2px;
    padding: 0px 10px;
    margin-bottom: 10px;
    line-height: 40px;
    font-size: 12px;
    user-select: none;
    .config-dec-indexblock-title {
        // border-bottom: 1px solid #EAEAEA;
        color: #333333;
        padding-left: 8px;
    }
}
</style>
