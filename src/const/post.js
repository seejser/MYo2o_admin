'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const STATUS_LIST = [
    {
        name : '待审核',
        value: 0,
        key:'unAudit',
    },
    {
        name : '正常',
        value: 1,
        key:'default',
    },
    {
        name : '系统屏蔽',
        value: 2,
        key:'systemShield',
    },
    {
        name : '用户删除',
        value: 3,
        key:'userRemove',
    },
    {
        name : '系统删除',
        value: 4,
        key:'systemRemove',
    },
]
const STATUS_MAP = ListToMap(STATUS_LIST);
const STATUS_KEY = ListToKey(STATUS_LIST);

const LIKE_STATUS_LIST = [
    {
        name : '喜欢',
        value: 1,
        key:'like',
    },
    {
        name : '不喜欢',
        value: 2,
        key:'unLike',
    },
]
const LIKE_STATUS_MAP = ListToMap(LIKE_STATUS_LIST);
const LIKE_STATUS_KEY = ListToKey(LIKE_STATUS_LIST);



module.exports = {
    STATUS_LIST,
    STATUS_MAP,
    STATUS_KEY,
    LIKE_STATUS_LIST,
    LIKE_STATUS_MAP,
    LIKE_STATUS_KEY,
}