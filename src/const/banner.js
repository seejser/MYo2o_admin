'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const BANNER_BELONG_LIST = [
    {
        name : '首页',
        value: 1,
        key:'home',
    },
    {
        name : '核心业务',
        value: 2,
        key:'transaction',
    },
]
const BANNER_BELONG_MAP = ListToMap(BANNER_BELONG_LIST);
const BANNER_BELONG_KEY = ListToKey(BANNER_BELONG_LIST);



module.exports = {
    BANNER_BELONG_LIST,
    BANNER_BELONG_MAP,
    BANNER_BELONG_KEY
}