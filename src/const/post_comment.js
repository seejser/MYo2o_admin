'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const STATUS_LIST = [
    {
        name : '正常',
        value: 1,
        key:'default',
    },
    {
        name : '系统删除',
        value: 2,
        key:'systemRemove',
    },
    {
        name : '用户删除',
        value: 3,
        key:'userRemove',
    },
    {
        name : '主评论删除 回复删除',
        value: 4,
        key:'mainRemove',
    },
]
const STATUS_MAP = ListToMap(STATUS_LIST);
const STATUS_KEY = ListToKey(STATUS_LIST);

const STYLE_LIST = [
    {
        name : '评论',
        value: 1,
        key:'comment',
    },
    {
        name : '回复',
        value: 2,
        key:'reply',
    },
]
const STYLE_MAP = ListToMap(STYLE_LIST);
const STYLE_KEY = ListToKey(STYLE_LIST);



module.exports = {
    STATUS_LIST,
    STATUS_MAP,
    STATUS_KEY,
    STYLE_LIST,
    STYLE_MAP,
    STYLE_KEY,
}