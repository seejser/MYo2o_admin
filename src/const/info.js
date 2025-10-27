'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const STYLE_LIST = [
    {
        name : '用户隐私政策',
        value: 1,
        key:'privacy_agreement',
    },
    {
        name : '用户服务协议',
        value: 2,
        key:'user_agreement',
    },
]
const STYLE_MAP = ListToMap(STYLE_LIST);
const STYLE_KEY = ListToKey(STYLE_LIST);



module.exports = {
    STYLE_LIST,
    STYLE_MAP,
    STYLE_KEY
}