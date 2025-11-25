'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const TRANSACTION_TAG_LIST = [
    {
        name : '工签咨询',
        value: 1,
        key: "WorkPermitService",
    },
    {
        name : '外交服务',
        value: 2,
        key: "DiplomaticService",
    },
    {
        name : '商业信息',
        value: 3,
        key: "LabourRecruitment",
    },
    {
        name : '物流服务',
        value: 4,
        key: "LogisticsServices",
    },
    {
        name : 'IT服务',
        value: 5,
        key: "ITServices",
    },
    {
        name : '企业咨询',
        value: 6,
        key: "BusinessRegistration",
    },
]
const TRANSACTION_TAG_MAP = ListToMap(TRANSACTION_TAG_LIST);
const TRANSACTION_TAG_KEY = ListToKey(TRANSACTION_TAG_LIST);




module.exports = {
    TRANSACTION_TAG_LIST,
    TRANSACTION_TAG_MAP,
    TRANSACTION_TAG_KEY,
}