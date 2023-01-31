<template>
    <modal v-model="show"
           title="颜色配置"
           :width="460"
           :mask-closable="false"
           @on-ok="ok"
           @on-cancel="cancel">
        <div>
            <div class="lineheader">
                <div class="columns">条件</div>
                <div class="columns">数值</div>
                <div class="columns">颜色</div>
                <div class="action">操作</div>
            </div>
            <div class="line" v-for="(col,index) in form" :key="index">
                <div class="columns">
                    <Select v-model="col.condition">
                        <Option value="<">&lt;</Option>
                        <Option value="<=">&lt;=</Option>
                        <Option value="=">=</Option>
                    </Select>
                </div>
                <div class="columns">
                    <InputNumber v-model="col.number" style="width:114px"/>
                </div>
                <div class="columns">
                    <ColorPicker v-model="col.config" />
                </div>
                <div class="action">
                    <Button custom-icon="iconfont icon-shanchu1" @click="deletelline(index)"></Button>
                </div>
            </div>
            <div class="line">
                <Button custom-icon="iconfont icon-zengjia" @click="addline()">增加</Button>
            </div>
        </div>
    </modal>
</template>

<script>
import { clone } from '../../../public/utils';

export default {
    name:'StyleConfig',
    data() {
        return {
            show: false,
            form: [],
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
            type: Array,
            default: () => [],
        },
    },
    watch: {
        value: {
            handler() {
                this.form = clone(this.value);
            },
            deep: true,
        },
    },
    mounted() {
        this.form = clone(this.value);
    },
    methods: {
        ok() {
            // this.value = clone(this.form);
            this.$emit('onChange', clone(this.form));
            this.show = false;
        },
        cancel() {
            this.form = clone(this.value);
            this.show = false;
        },
        addline() {
            this.form.push({ condition: '<', number: 0, config: '#FFFFFF' });
        },
        deletelline(index) {
            this.form.splice(index, 1);
        },
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
}
.line {
    height: 40px;
    line-height: 40px;
}
/deep/ Button>i {
    font-size: 14px;
}
.columns {
    width: 30%;
    float: left;
    padding-right:10px;
}
.action {
    width: 10%;
    float: left;
    Button {
        padding:5px 6px;
        height: 30px;
        width: 30px;
        background: #E1E1E1;
        border: 1px solid #e1e1e1;
    }
}
</style>
