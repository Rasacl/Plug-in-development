<template>
    <div>
        <div style="display:inline-block">
            <Select v-model="type" style="width:88px;" @on-change="changeSelect" v-if="show">
                <Option v-for="item in options" :key="item.type" :value="item.type">{{item.typeName}}</Option>
            </Select>
        </div>
        <div style="display:inline-block;margin-left:-1px" v-if="!hidden">
            <Input v-model="cuvalue" style="width:200px;" @on-change="change" :placeholder="content" :disabled="disabled"/>
        </div>
    </div>
</template>

<script>
export default {
    name:'stringWthSelect',
    data() {
        return {
            type: 'ID',
            cuvalue: '',
            content: '',
            disabled: false,
            hidden: false,
            show: false,
        };
    },
    model: {
        prop: 'value',
        event: 'onChange',
    },
    props: {
        value: {
            type: Object,
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        this.type = this.value.type;
        const selectitem = this.options.find((item) => item.type === this.type);
        this.cuvalue = this.value.value;
        this.changeType(selectitem);
        this.show = true;
    },
    methods: {
        changeSelect(type) {
            const selectitem = this.options.find((item) => item.type === type);
            this.cuvalue = selectitem.value;
            this.changeType(selectitem);
            this.change();
        },
        changeType(selectitem) {
            this.content = selectitem.content;
            this.disabled = selectitem.disabled;
            this.visible = selectitem.hidden ? selectitem.hidden : false;
        },
        change() {
            const res = {
                type: this.type,
                value: this.cuvalue,
            };
            this.$emit('onChange', res);
        },
    },
};
</script>
