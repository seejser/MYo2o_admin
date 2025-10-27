'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const STATUS_LIST = [
    {
        name : '已提交',
        value: 1,
        key:'submited',
    },
    {
        name : '已处理',
        value: 2,
        key:'handled',
    },
]
const STATUS_MAP = ListToMap(STATUS_LIST);
const STATUS_KEY = ListToKey(STATUS_LIST);





module.exports = {
    STATUS_LIST,
    STATUS_MAP,
    STATUS_KEY,
}