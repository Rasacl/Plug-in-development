<template>
    <div>
        <i-switch v-model="value1" @on-change="change" size="small" />
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    name:'MutexSwitch',
    props: {
        value: {
            type: Boolean,
        },
        conf: {
            type: Object,
            default: () => ({}),
        },
        flag: {
            type: String,
        },
        // 保证this.conf[this.unique]为独一无二的值   标记用des 孪生体用key  采用传值来处理
        unique: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            value1: false,
        };
    },
    mounted() {
        
        this.value1 = this.value;
        Vue.prototype.$changeSwitch.$on('getSwitchStatus', (key, flag) => {
            if (key !== this.conf[this.unique] && flag === this.flag) {
                this.value1 = false;
                this.$emit('update:value', false);
            }
        });
    },
    methods: {
        change(value) {
            if (value) {
                Vue.prototype.$changeSwitch.$emit('getSwitchStatus', this.conf[this.unique], this.flag);
            }
            this.$emit('update:value', value);
        },
    },
    created() {
        Vue.prototype.$changeSwitch = new Vue();
    },
};
</script>

<style>
</style>
