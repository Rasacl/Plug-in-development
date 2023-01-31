<template>
    <div style="display:flex;user-select: none;position:relative">
        <input v-show="false" ref="Icon" type="file" :accept="accept" @change="selectFile" />
        <div v-if="showIcon">
            <div class="myimg" @click="clearImage(item)" v-for="(item,index) in listurl" :key="item" :ref="'img'+index">
                <img alt="加载失败" :src="getResourceUrl(item)" class="myimg" style="height:48px;width:48px;"/>
                <div class="imgupload" >
                    <Icon class="iconfont icon-shanchu1" size="12"/>
                </div>
            </div>
            <div class="myimg" @click="clickImage" v-if="value.length < conf.maxListLength">
                <Icon class="iconfont icon-zengjia"/>
            </div>
        </div>
    </div>
</template>
<script>
// import vuedraggable from 'vuedraggable';
import { configure } from '@nova/api';
import { getResourceUrl, getResourcePath } from '../../../public/core/tools/location';
import { getField } from '../../../public/utils';

export default {
    name:'mulitImageUpload',
    // components: {
    //     vuedraggable,
    // },
    model: {
        prop: 'value',
        event: 'onChange',
    },
    props: {
        conf: {
            type: Object,
        },
        value: {
            type: Array,
        },
        originPath: {
            type: String,
        },
        originConfig: {
            type: Object,
        },
    },
    watch: {
        value: {
            handler(val) {
                if (val) {
                    this.showIcon = false;
                    const list = [];
                    val.forEach((item) => {
                        list.push(this.getCurrentUrl(item));
                    });
                    this.$nextTick(() => {
                        this.showIcon = true;
                        this.listurl = list;
                    });
                }
            },
            deep: true,
        },
    },
    data() {
        return {
            cuurl: '',
            showIcon: true,
            accept: ['.png'],
            listurl: [],
            showdrag: false,
            originImage: [],
            maxFileSize: '10MB',
        };
    },
    mounted() {
        const list = [];
        this.value.forEach((item) => {
            list.push(this.getCurrentUrl(item));
        });
        this.listurl = list;
        if (this.conf.accept) {
            this.accept = this.conf.accept;
        }
        if (this.conf.maxFileSize) {
            this.maxFileSize = this.conf.maxFileSize;
        }
        const path = this.conf.des.split(',')[0];
        const originImage = getField(this.originConfig, path);
        this.originImage = originImage.map((item) => this.getCurrentUrl(item));
    },
    methods: {
        getResourceUrl,
        getCurrentUrl(url) {
            let cuurl = '';
            // eslint-disable-next-line no-undef
            if (url.indexOf('configure') < 0) {
                cuurl = this.originPath + url;
            } else {
                cuurl = url;
            }
            cuurl = getResourcePath(cuurl);
            return cuurl;
        },
        clearImage(url) {
            const index = this.listurl.indexOf(url);
            if (index >= 0) {
                const list = [...this.value];
                list.splice(index, 1);
                if (list.length > 0) {
                    const resultList = list.map((item) => this.getCurrentUrl(item));
                    this.$emit('onChange', resultList);
                } else {
                    // const resultList = this.originImage.map((item) => this.getCurrentUrl(item));
                    // this.$emit('onChange', resultList);
                    this.$emit('onChange', []);
                }
            }
        },
        clickImage() {
            this.$refs.Icon.value = '';
            this.$refs.Icon.click();
        },
        onEnd() {
            const list = [...this.listurl];
            const resultList = list.map((item) => this.getCurrentUrl(item));
            this.$emit('onChange', resultList);
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
                                content: `图片大小超出${this.conf.maxSize}`,
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
                            let list = [];
                            list = [...this.value];
                            list.push(res.data);

                            const resultList = list.map((item) => this.getCurrentUrl(item));
                            this.$emit('onChange', resultList);
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
    float:left;
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
    margin-right: 8px;
    margin-bottom: 6px;
    .imgupload {
        display: none;
    }
}
.myimg:hover {
    cursor: pointer;
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
