<template>
    <div>
        <RadioGroup v-model="type" @on-change="changeRadio">
            <Radio v-for="item in Object.keys(conf.defaultValues)" :key="item" :label="item"></Radio>
        </RadioGroup>
    </div>
</template>

<script>
export default {
    name:'ValueDefault',
    data() {
        return {
            type: '',
            mountedload: true,
        };
    },
    model: {
        prop: 'value',
        event: 'onChange',
    },
    mounted() {
        this.type = this.value;
    },
    props: {
        conf: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: String,
            default: '',
        },
        form: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        changeRadio() {
            if (this.type) {
                if (this.conf.defaultValues[this.type]) {
                    Object.keys(this.conf.defaultValues[this.type]).forEach((key) => {
                        this.form[key] = this.conf.defaultValues[this.type][key];
                    });
                    this.$emit('onChange', this.type);
                }
            }
        },
    },
};
</script>
