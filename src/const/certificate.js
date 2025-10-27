'use strict';

const {
    ListToMap,
    ListToKey,
} = require("./index");

const CERTIFICATE_STYLE_LIST = [
    {
        name : '身份证',
        value: 1,
        key: "IdCard",
    },
    {
        name : '驾驶证',
        value: 2,
        key: "DrivingLicence",
    },
    {
        name : '护照',
        value: 3,
        key: "Passport",
    },
]
const CERTIFICATE_STYLE_MAP = ListToMap(CERTIFICATE_STYLE_LIST);
const CERTIFICATE_STYLE_KEY = ListToKey(CERTIFICATE_STYLE_LIST);




module.exports = {
    CERTIFICATE_STYLE_LIST,
    CERTIFICATE_STYLE_MAP,
    CERTIFICATE_STYLE_KEY,
}