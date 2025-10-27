'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const MENU_TYPE_LIST = [
    {
        name : '菜单',
        value: 1,
        key:'menu',
    },
    {
        name : '方法',
        value: 2,
        key:'method',
    },
]
const MENU_TYPE_MAP = ListToMap(MENU_TYPE_LIST);
const MENU_TYPE_KEY = ListToKey(MENU_TYPE_LIST);



module.exports = {
    MENU_TYPE_LIST,
    MENU_TYPE_MAP,
    MENU_TYPE_KEY
}