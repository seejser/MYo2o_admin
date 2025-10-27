'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const STYLE_LIST = [
    {
        name : '帖子通知',
        value: 1,
        key:"post",
    },
    {
        name : '评论通知',
        value: 2,
        key:'postComment',
    },
    {
        name : '评论回复',
        value: 3,
        key:'commentReback',
    },
]
const STYLE_MAP = ListToMap(STYLE_LIST);
const STYLE_KEY = ListToKey(STYLE_LIST);

const STATUS_LIST = [
    {
        name : '未发送',
        value: 1,
        key:'unSend',
    },
    {
        name : '发送成功',
        value: 2,
        key:'sendSuccess',
    },
    {
        name : '发送失败',
        value: 3,
        key:'sendError',
    },
]
const STATUS_MAP = ListToMap(STATUS_LIST);
const STATUS_KEY = ListToKey(STATUS_LIST);



module.exports = {
    STYLE_LIST,
    STYLE_MAP,
    STYLE_KEY,
    STATUS_LIST,
    STATUS_MAP,
    STATUS_KEY,
}