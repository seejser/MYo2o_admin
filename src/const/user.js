'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const MUTE_LIST = [
    {
        name : '关闭',
        value: 1,
        key:'close',
    },
    {
        name : '开启',
        value: 2,
        key:'open',
    },
]
const MUTE_MAP = ListToMap(MUTE_LIST);
const MUTE_KEY = ListToKey(MUTE_LIST);

const EXPERT_LIST = [
    {
        name : '否',
        value: 1,
        key:'no',
    },
    {
        name : '是',
        value: 2,
        key:'yes',
    },
]
const EXPERT_MAP = ListToMap(EXPERT_LIST);
const EXPERT_KEY = ListToKey(EXPERT_LIST);



module.exports = {
    MUTE_LIST,
    MUTE_MAP,
    MUTE_KEY,
    EXPERT_LIST,
    EXPERT_MAP,
    EXPERT_KEY
}