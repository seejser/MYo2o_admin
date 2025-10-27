"use strict"

/**
 * List转化为MAP
 * @param {*} list 
 */
const ListToMap = (list) => {
    let arr = {};
    list.map((item,index) => {
        arr[item.value] = item.name; 
    })
    return arr;
}

/**
 * List转化为KEY
 * @param {*} list 
 * @returns 
 */
const ListToKey = (list) => {
    let arr = {};
    list.map((item,index) => {
        arr[item.key] = item.value; 
    })
    return arr;
}


module.exports = {
    ListToMap,
    ListToKey,
}
