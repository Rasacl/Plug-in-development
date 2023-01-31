<template>
    <div v-if="conf.selections.length>0 && value">
        <div v-for="(selection,index) in conf.selections" :key="index" style="display:inline-block;margin-right:10px;">
            {{rowBefore(index)}}
            <Select
                v-model="value[index]"
                transfer
                :style="{width:selectwidth?selectwidth+'px':'100px'}">
                <Option v-for="item in selection"
                        :key="item.key"
                        :value="item.key">{{item.keyname}}</Option>
            </Select>
            {{rowAfter(index)}}
        </div>
    </div>
</template>

<script>
export default {
    name:'Multiselection',
    data() {
        return {};
    },
    model: {
        prop: 'value',
        event: 'onChange',
    },
    props: {
        conf: {
            type: Object,
            default: () => ({
                width: 60,
                ...this.conf,
            }),
        },
        value: {
            type: Array,
        },
    },
    computed: {
        selectwidth() {
            return this.conf.width / this.conf.selections.length;
        },
    },
    methods: {
        rowBefore(num) {
            if (this.conf.prefix) return this.conf.prefix[num];
            return '';
        },
        rowAfter(num) {
            if (this.conf.postfix) return this.conf.postfix[num];
            return '';
        },
    },
};
</script>
