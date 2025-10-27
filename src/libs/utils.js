
/**
 * 将数据存入sessionStorage
 */
const saveData = (key, data) => {
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    }
    sessionStorage[key] = data;
};

/**
 * 从sessionStorage读取数据
 */
const getData = (key) => {
    let data = sessionStorage[key];
    if(data){
        try {
            data = JSON.parse(data);
            return data;
        } catch(e) {
            return data;
        }
    }else {
        return null;
    }
};
/**
*将数据清理
*/
const clearData = (key)=>{
    sessionStorage.removeItem(key)
};


const saveLocalData = (key, value) => {
    /*
    * set 存储方法
    * @ param {String}  key 键
    * @ param {String}  value 值，
    * @ param {String}  expired 过期时间，以分钟为单位，非必须
    */
    let source = {};
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    source['value'] = value;
    source[`${key}__expires__`] = Date.now() + 1000*86400*1;
    localStorage.setItem(key,JSON.stringify(source));
}

const getLocalData = (key) => {
    /*
    * get 获取方法
    * @ param {String}  key 键
    * @ param {String}  expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now+1
    * @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享
    */
    let source = localStorage.getItem(key);
    if(!source){    
        return null;
    }
    try {
        source = JSON.parse(source);
    } catch(e) {
        return null;
    }
    let expired = source[`${key}__expires__`]||Date.now;
    const now = Date.now();
    if ( now >= expired ) {
        localStorage.removeItem(key);
        return null;
    }
    let data = source['value'];
    if(data){
        try {
            data = JSON.parse(data);
            return data;
        } catch(e) {
            return data;
        }
    }else {
        return null;
    }
}

const removeLocalData = (key) => {
    localStorage.removeItem(key);
}

const checkPhone = (phone)=> {
    var myreg=/^((13[0-9])|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[3,5,6,7,8])|(18[0-9])|(19[8,9]))\d{8}$/;
    if (!myreg.test(phone)) {
        return false;
    }else{
        return true;
    }
}

/**
*32位随机
*/
const getUuid = ()=>{
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var nums="";
    for(var i=0;i<32;i++){
        var id = parseInt(Math.random()*61);
        nums+=chars[id];
    }
    return nums;
}

//时间字符串转化
const commonDateTimeFormat = (str) => {
    var dateStr = str;
    try{
        var date = new Date(dateStr);
        dateStr = date.toLocaleDateString().replace(/\//g,'-');
    }catch(e){}
    return dateStr;
}

const strTrim = (str) =>{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


const getUrlMainePath = (str) => {
　　 var url = window.location.protocol + "//" + window.location.host;
　　 return url;
}

const formatRichText = (html) => {
    if(!html || html == undefined || html == '') return '';
    let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    return newContent;
}

const checkEmail = (email) => {
    
    var reg = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
    if(reg.test(email)){
        return true;
    }else{
       return false;
    }
}

const getWindowWidth = () => {
    var winWidth;
    if(window.innerWidth) {
        winWidth = window.innerWidth;
    } else if((document.body) && (document.body.clientWidth)) {
        winWidth = document.body.clientWidth;
    }
    return winWidth;
}

//判断是否为空 是返回true 否则false
const checkEmpty = (value) => {
    if(value && value != undefined && value != ''){
        return false;
    }
    return true;
}


const getQueryString = () => {
    let qs = window.location.search.substring(1);
    let args = {};
    let items = qs.length ? qs.split('&') : [];
    items.map((item) => {
        item = item.split('=');
        let name = decodeURIComponent(item[0]);
        let value = decodeURIComponent(item[1]).replace(/.html/g,'');
        if (name) {
            args[name] = value;
        }
    });
    return args;
}



const getDateFormat = (date,formatString='YYYY-MM-DD HH:mm:ss') => {
    const moment = require('moment');
    return  moment(date).format(formatString);
}


const getNowDate = () => {
    let now = new Date();
    const moment = require('moment');
    return  moment(now).format('YYYY-MM-DD HH:mm:ss');
}




const todayStart = () => {
    return new Date(
        new Date(new Date().toLocaleDateString()).getTime()
    )
}
const todayEnd = () => {
    return new Date( // 当天23:59
        new Date(new Date().toLocaleDateString()).getTime() +
        24 * 60 * 60 * 1000 -
        1
    )
}

/**
 * 获取倒退天 日期
 * @param  {[type]} date [description]
 * @param  {[type]} day  [description]
 * @return {[type]}      [description]
 */
const getFallbackDate =(date,day) => {
    day = parseInt(day);
    return new Date( // 
        date.getTime() -
        day * 24 * 60 * 60 * 1000
    )
}

/**
 * @returns {string}
 */
const createUniqueString = () => {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}



//map数组转化为query字符串
const mapToQuery = (args) => {

    var keys = Object.keys(args).sort();

    let queryList = [];
    keys.map((v) => {
        queryList.push({
            key:v,
            value:args[v] + ''
        })
    });

    var queryTemp = '';
    queryList.map( (v) => {
        queryTemp += `${v.key}=${v.value}&`;
    })
    if(queryTemp.length > 0){
        queryTemp = queryTemp.substr(0,queryTemp.length - 1);
    }
    
    return queryTemp;

}

const getUrlRelativePath = () => {
    var url = document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") != -1){
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

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

export {
    saveData,
    getData,
    clearData,
    saveLocalData,
    getLocalData,
    removeLocalData,
    checkPhone,
    getUuid,
    commonDateTimeFormat,
    strTrim,
    getUrlMainePath,
    formatRichText,
    checkEmail,
    getWindowWidth,
    checkEmpty,
    getQueryString,
    getDateFormat,
    getNowDate,
    todayStart,
    todayEnd,
    getFallbackDate,
    createUniqueString,
    mapToQuery,
    getUrlRelativePath,
    ListToMap,
    ListToKey,
}






