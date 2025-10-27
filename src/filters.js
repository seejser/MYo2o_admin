
const phoneFilter = (value) => {

	if(value && value != undefined && value.length == 11){
		value = value.substr(0,3)+"****"+value.substr(7); 
	}
	return value; 
}
const priceFilter = (value) => {
	value = parseFloat(value);
    if(isNaN(value)){
        return '---'
    }
	return value.toFixed(2);
}

const dateMonthFilter = (str) => {
    var dateStr = str;
    try{
        var date = new Date(dateStr);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        dateStr = y + '-' + m;
    }catch(e){}
    return dateStr;
}


const dateFilter = (str) => {
    var dateStr = str;
    try{
        var date = new Date(dateStr);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        dateStr = y + '-' + m + '-' + d;
    }catch(e){}
    return dateStr;
}

const dateTimeFilter = (str) => {
    var dateStr = str;
    try{
        var date = new Date(dateStr);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        dateStr = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    }catch(e){}
    return dateStr;
}


const formatToTime = (num) => {

    let min = Math.floor(num%3600);//分钟

    let hour = Math.floor(num/3600);
    let miniute = Math.floor(min / 60);
    let second = Math.floor(num % 60);
    
    return `${hour > 9 ? hour : '0' + hour}:${miniute > 9 ? miniute : '0' + miniute}:${second > 9 ? second : '0' + second}` 

}

export default {
    phoneFilter,
    priceFilter,
    dateFilter,
    dateTimeFilter,
    formatToTime,
    dateMonthFilter
}
