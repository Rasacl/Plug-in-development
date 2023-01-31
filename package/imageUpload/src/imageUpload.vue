<template>
    <div v-if="showIcon">
        <input v-show="false" ref="Icon" type="file" :accept="accept" @change="selectFile" />
        <div class="myimg"  @click="clickImage">
            <img alt="加载失败" :src="cuurl?cuurl:getResourceUrl(originPath+originImage)" v-if="showIcon" style="height:48px;width:48px;"/>
            <div class="imgupload">
                <Icon class="iconfont icon-jiaohuan" size="12"/>
            </div>
        </div>
    </div>
</template>
<script>
import { configure } from '@nova/api';
import { getResourceUrl, getResourcePath } from '../../../public/core/tools/location';
import { getField } from '../../../public/utils';

export default {
    name:'imageUpload',
    model: {
        prop: 'value',
        event: 'onChange',
    },
    props: {
        conf: {
            type: Object,
        },
        value: {
            type: String,
        },
        originPath: {
            type: String,
        },
        originConfig: {
            type: Object,
        },
    },
    watch: {
        value(val) {
            this.showIcon = false;
            this.getCurrentUrl(val);
            this.$nextTick(() => {
                this.showIcon = true;
            });
        },
    },
    data() {
        return {
            cuurl: '',
            showIcon: true,
            accept: ['.png'],
            originImage: '',
            maxFileSize: '10MB',
        };
    },
    mounted() {
        this.getCurrentUrl(this.value);
        if (this.conf.accept) {
            this.accept = this.conf.accept;
        }
        if (this.conf.maxFileSize) {
            this.maxFileSize = this.conf.maxFileSize;
        }
        const path = this.conf.des.split(',')[0];
        this.originImage = getField(this.originConfig, path);
    },
    methods: {
        getResourceUrl,
        getResourcePath,
        getCurrentUrl(url) {
            if (!url || url.indexOf('configure') < 0) {
                this.cuurl = '';
            } else {
                this.cuurl = getResourceUrl(url);
            }
        },
        clickImage() {
            this.$refs.Icon.value = '';
            this.$refs.Icon.click();
        },
        selectFile() {
            const file = this.$refs.Icon.files[0];
            const fileName = file.name;
            const fileType = `.${fileName.split('.').reverse()[0]}`.toLowerCase();
            if (this.accept.indexOf(fileType) === -1) {
                this.$Message.error({
                    content: '文件格式不符',
                    duration: 3,
                });
                return;
            }
            const sizeType = this.maxFileSize.substring(this.maxFileSize.length - 2).toLowerCase();
            const mysize = this.maxFileSize.substring(0, this.maxFileSize.length - 2);
            let finsize = 0;
            if (sizeType === 'mb') {
                finsize = mysize * 1024 * 1024;
            } else if (sizeType === 'kb') {
                finsize = mysize * 1024;
            }
            if (file.size > finsize) {
                this.$Message.error({
                    content: `文件大小超出${this.maxFileSize}`,
                    duration: 3,
                });
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                // 加载图片获取图片真实宽度和高度
                const image = new Image();
                image.onload = () => {
                    if (this.conf.maxSize) {
                        const { width } = image;
                        const { height } = image;
                        const maxwidth = this.conf.maxSize.split('*')[0];
                        const maxheight = this.conf.maxSize.split('*')[1];
                        if (width > maxwidth || height > maxheight) {
                            this.$Message.error({
                                content: `大小超出${this.conf.maxSize}`,
                                duration: 3,
                            });
                            return;
                        }
                    }
                    const formData = new FormData();
                    formData.append('type', 'decorIcon');
                    formData.append('file', file);
                    this.uploadrefresh = false;
                    configure.uploadResourceFile(formData).then((res) => {
                        if (res.success) {
                            const result = getResourcePath(res.data);
                            this.$emit('onChange', result);
                        } else {
                            this.$Message.error({
                                content: res.message,
                                duration: 3,
                            });
                        }
                        this.uploadrefresh = true;
                    });
                };
                image.src = data;
            };
            reader.readAsDataURL(file);
        },
    },
};
</script>

<style scoped lang='less'>
@import "~@uino/kiss-ui/src/styles/custom.less";
.myimg {
    height: 50px;
    width: 50px;
    line-height: 48px;
    text-align: center;
    object-fit: cover;
    position: relative;
    border-radius: 2px;
    background: #f2f2f2;
    border: 1px dashed #E1E1E1;
    color: #E1E1E1;
    cursor: pointer;
    .imgupload {
        display: none;
    }
}
.myimg:hover {
    .imgupload {
        border-radius: 2px;
        display: block;
        position: absolute;
        top:0;
        left: 0;
        height: 48px;
        width: 48px;
        line-height: 48px;
        text-align: center;
        background: #00000080;
        transition: 0.3s;
        color: #E1E1E1;
    }
}
</style>
