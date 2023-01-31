import _ from 'lodash';
import { configure } from '@nova/api';

export {
    conditionReplaceName,
    getField,
    clone,
    blobToFileDownload,
    getNumberArr,
    isLiveForArr,
    getLiveForArrIndex,
    deleteItemForIndex,
    versionStringCompare,
    getStrLength,
    getPluginManageRole,
} from '@nova/thingjsx-tools';

export const getPlugins = () => {
    const promise1 = configure.pageByQuery({
        type: 'core',
        pageNum: 1,
        pageSize: 9999,
    });
    const promise2 = configure.getSysConfig({ key: 'core', type: 'enabled' });
    return Promise.all([promise1, promise2]).then(([res, res2]) => {
        const plugins = [];
        const pluginsMap = new Map();
        _.forEach(res?.data?.data, (item) => {
            item.enabled = false;
            plugins.push(item);
            pluginsMap.set(item.uuid, item);
        });
        _.forEach(res2?.data, (item) => {
            const plugin = pluginsMap.get(item.field);
            if (plugin) {
                plugin.enabled = item.value === 'true';
            }
        });
        return plugins;
    });
};
