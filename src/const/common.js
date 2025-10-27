'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const DISABLE_LIST = [
    {
        name : '显示',
        value: 1,
        key:'show',
    },
    {
        name : '隐藏',
        value: 2,
        key:'hidden',
    },
]
const DISABLE_MAP = ListToMap(DISABLE_LIST);
const DISABLE_KEY = ListToKey(DISABLE_LIST);

const OPEN_TYPE_LIST = [
    {
        name : '不设置',
        value: 1,
        key:'notSet',
    },
    {
        name : '跳转链接',
        value: 2,
        key:'jumpLink',
    },
    {
        name : '跳转小程序',
        value: 3,
        key:'jumpMini',
    },
    {
        name: '跳转其他小程序',
        value: 4,
        key: 'jumpOtherMini'
    }
]
const OPEN_TYPE_MAP = ListToMap(OPEN_TYPE_LIST);
const OPEN_TYPE_KEY = ListToKey(OPEN_TYPE_LIST);

const STATUS_LIST = [
    {
        name : '正常',
        value: 1,
        key:'default',
    },
    {
        name : '删除',
        value: 2,
        key:'delete',
    },
]
const STATUS_MAP = ListToMap(STATUS_LIST);
const STATUS_KEY = ListToKey(STATUS_LIST);

const COLLECT_STATUS_LIST = [
    {
        name : '已收藏',
        value: 1,
        key:'collected',
    },
    {
        name : '未收藏',
        value: 2,
        key:'unCollect',
    },
]
const COLLECT_STATUS_MAP = ListToMap(COLLECT_STATUS_LIST);
const COLLECT_STATUS_KEY = ListToKey(COLLECT_STATUS_LIST);

const LIKE_STATUS_LIST = [
    {
        name : '点赞',
        value: 1,
        key:'liked',
    },
    {
        name : '未点赞',
        value: 2,
        key:'unLike',
    },
]
const LIKE_STATUS_MAP = ListToMap(LIKE_STATUS_LIST);
const LIKE_STATUS_KEY = ListToKey(LIKE_STATUS_LIST);

const ARTICLE_STYLE_LIST = [
    {
        name : '视频',
        value: 1,
        key:'video',
    },
    {
        name : '图文链接',
        value: 2,
        key:'link',
    },
    {
        name : '富文本',
        value: 3,
        key:'rich',
    },
]

const ARTICLE_STYLE_MAP = ListToMap(ARTICLE_STYLE_LIST);
const ARTICLE_STYLE_KEY = ListToKey(ARTICLE_STYLE_LIST);


const COMMENT_STATUS_LIST = [
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
]
const COMMENT_STATUS_MAP = ListToMap(COMMENT_STATUS_LIST);
const COMMENT_STATUS_KEY = ListToKey(COMMENT_STATUS_LIST);


module.exports = {
    DISABLE_LIST,
    DISABLE_MAP,
    DISABLE_KEY,
    OPEN_TYPE_LIST,
    OPEN_TYPE_MAP,
    OPEN_TYPE_KEY,
    STATUS_LIST,
    STATUS_MAP,
    STATUS_KEY,
    COLLECT_STATUS_LIST,
    COLLECT_STATUS_MAP,
    COLLECT_STATUS_KEY,
    LIKE_STATUS_LIST,
    LIKE_STATUS_MAP,
    LIKE_STATUS_KEY,
    ARTICLE_STYLE_LIST,
    ARTICLE_STYLE_MAP,
    ARTICLE_STYLE_KEY,
    COMMENT_STATUS_LIST,
    COMMENT_STATUS_MAP,
    COMMENT_STATUS_KEY
}