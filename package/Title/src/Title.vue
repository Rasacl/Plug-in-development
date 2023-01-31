<template>
    <div class="config-title-components" :style="conf">
        <div class="config-title-components-bar"></div>
        <span class="config-title-components-label">{{ data }}
            <Tooltip v-if="tooltip" :content="tooltip" placement="right" transfer>
                <Icon custom="iconfont icon-tips" style="font-size: 12px;color: rgb(153, 153, 153);" />
            </Tooltip>
            <slot name="inline"></slot>
        </span>
        <slot name="outline"></slot>
    </div>
</template>

<script>
export default {
    name:'Title',
    props: {
        conf: {
            // 样式
            type: Object,
            default: () => ({}),
        },
        data: {
            // 数据
            type: String,
            default: '',
        },
        tooltip: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less" scoped>
.config-title-components{
    display: flex;
    align-items: center;
    width: auto;
    height: 30px;
    justify-content: flex-start;
    position: relative;
    margin-bottom:16px;
    .config-title-components-bar {
        height: 14px;
        width: 3px;
        background: #ff954b;
        position: absolute;
        left:-8px;
    }
    .config-title-components-label {
        font-family: MicrosoftYaHeiSemibold;
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        flex:1 0 0;
        text-align: left;
    }
}
</style>
