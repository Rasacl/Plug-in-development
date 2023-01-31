
<template>
    <div v-if="conf.number > 0">
        <div v-for="item in conf.number" :key="item" style="margin-bottom:10px;">
            {{ rowBefore(item - 1) }}
            <InputNumber v-model="value[item - 1]" style="margin-right:10px;margin-right:2px;"
                :style="{ width: inputwidth ? inputwidth + 'px' : '100px' }" />
            {{ rowAfter(item - 1) }}
        </div>
    </div>
</template>

<script>
export default {
    name:'Multinumber',
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
            default() {
                return {
                    number: 3,
                    width: 60,
                    ...this.conf,
                };
            },
        },
        value: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        inputwidth() {
            return this.conf.width / this.conf.number;
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
