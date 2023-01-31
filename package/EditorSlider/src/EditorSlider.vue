<template>
    <div style="display:block;" :style="{ width: comwidth() }">
        <div class="Sliderit">
            <RadioGroup class="rgclass" v-model="valuetype" v-if="conf.isNeedChange">
                <Radio label="simple">固定{{ conf.caption }}</Radio>
                <Radio label="mulit">随机{{ conf.caption }}</Radio>
            </RadioGroup>
            <div class="silclass" :style="{ marginTop: valuetype === 'simple' ? '0px' : '10px' }">
                {{ rowBefore() }}
                <Slider class="slider" v-model="value" :min="conf.min" :max="conf.max" :step="conf.step" show-input
                    :range="valuetype === 'mulit'" :style="{ marginLeft: valuetype === 'mulit' ? '5px' : '0px' }" />
                {{ rowAfter() }}
                <span class="uint" v-if="valuetype === 'simple' && conf.unit">{{ conf.unit }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'EditorSlider',
    data() {
        return {
            valuetype: 'simple',
            value: this.valueo,
        };
    },
    model: {
        prop: 'valueo',
        event: 'onChange',
    },
    props: {
        conf: {
            type: Object,
            default() {
                return {
                    max: 100,
                    min: 0,
                    step: 1,
                    width: 200,
                    ...this.conf,
                };
            },
        },
        valueo: {
            default: 0,
        },
    },
    watch: {
        valuetype(val) {
            if (val === 'simple') {
                this.value = Array.isArray(this.value) ? this.value[0] : this.conf.min || 0;
            } else if (val === 'mulit') {
                this.value = Array.isArray(this.value) ? this.value : [this.conf.min || 0, this.conf.min || 0];
            }
        },
        value(val) {
            this.$emit('onChange', val);
        },
        valueo: {
            handler(val) {
                this.value = val;
                this.valuetype = Array.isArray(this.value) ? 'mulit' : 'simple';
            },
            immediate: true,
        },
    },
    methods: {
        rowBefore() {
            if (this.conf.prefix) return this.conf.prefix;
            return '';
        },
        rowAfter() {
            if (this.conf.postfix) return this.conf.postfix;
            return '';
        },
        comwidth() {
            const width = this.conf.width ? this.conf.width : 200;
            return this.valuetype === 'mulit' ? `${width}px` : `${width + 100}px`;
        },
    },
};
</script>

<style lang="less" scoped>
.Sliderit {
    display: block;
    line-height: 30px;
    position: relative;
    width: 100%;

    .rgclass {
        width: 120%;
    }

    .silclass {
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .slider {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
        flex-direction: row-reverse;
        width: 100%;

        /deep/.ivu-slider-wrap {
            margin: 0;
            flex: 1 0 0;
        }

        /deep/ .ivu-slider-bar {
            height: 6px;
            border-radius: 3px;
        }

        .ivu-slider-button {
            border: 1px solid #ff954b;
        }

        .ivu-slider-button:hover {
            border: 2px solid #ff954b;
        }

        /deep/ .ivu-input-number {
            margin: 0 5px 0 15px;
        }
    }
}
</style>
