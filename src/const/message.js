'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");


const STATUS_LIST = [
    {
        name : '未读',
        value: 1,
        key:'unRead',
    },
    {
        name : '已读',
        value: 2,
        key:'readed',
    },
]
const STATUS_MAP = ListToMap(STATUS_LIST);
const STATUS_KEY = ListToKey(STATUS_LIST);


const STYLE_LIST = [
    {
        name : '帖子评论',
        value: 1,
        key:'postComment',
    },
    {
        name : '评论回复',
        value: 2,
        key:'commentReback',
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