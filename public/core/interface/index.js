/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import { classMp, configure } from '@nova/api';
import { getResourceUrl } from '@/core/tools/location';
import preview from '@/assets/img/resource_list_preview.png';

let api;
const imgTypeList = ['jpg', 'jpeg', 'png', 'gif'];
const videoTypeList = ['rmvb', 'mp4', '3gp', 'mpeg', 'wmv', 'avi', 'mov', 'mpv', 'flv', 'swf'];
class ConfigureApi {
    constructor() {
        api = this;
    }

    getBusinessType() {
        return new Promise((resolve, reject) => {
            classMp.getSelectorClassList({ queryType: 1 }).then((res) => {
                resolve(res.data);
            }).catch((e) => {
                reject();
                console.error(e);
            });
        }, (reject) => {
            reject(false);
        });
    }

    getResource(type) {
        return new Promise((resolve, reject) => {
            configure.pageByQuery({
                type,
                pageNum: 1,
                pageSize: 9999,
            }).then((res) => {
                const data = [];
                _.forEach(res.data?.data, (item) => {
                    data.push({
                        ...item,
                        preview: item.preview ? getResourceUrl(item.path + item.preview) : preview,
                    });
                });
                resolve(data);
            }).catch((e) => {
                reject();
                console.error(e);
            });
        });
    }

    getResourceForPropertyPanel(type) {
        return new Promise((resolve, reject) => {
            const promise = this.getResource(type);
            promise.then((data = []) => {
                const res = data.map((item) => {
                    const desc = item.desc?.toLowerCase();
                    const { path, name, file } = item;
                    let image = '';
                    if (imgTypeList.includes(desc)) { // 如果是图片
                        image = path ? getResourceUrl(path + name) : null;
                    } else if (videoTypeList.includes(desc)) { // 如果是视频
                        const previewImg = `${path + name.slice(0, name.lastIndexOf('.'))}.jpg`;
                        image = path ? getResourceUrl(previewImg.trim()) : null;
                    }
                    return {
                        name,
                        value: path + file,
                        src: image || preview,
                    };
                });
                resolve(res);
            }).catch((e) => {
                reject();
                console.error(e);
            });
        });
    }
}

export default api || new ConfigureApi();
