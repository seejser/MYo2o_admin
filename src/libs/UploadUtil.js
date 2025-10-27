import X2JS from 'x2js';

import axios from '../../node_modules/axios';
import BaseConfig from '@/config/config.js';
axios.defaults.baseURL = BaseConfig.apiUrl;

const getOssConfig = async (path) => {
  return new Promise((resolve,rejust) => {
    axios.get(`common/getOssConfig`,{
      params: {
        dirpath: path
      }
    })
    .then((res) => {
        let { code, msg, data } = res;
        if(code == 0){
            resolve(data);
        }
        resolve(null);
    })
    .catch((error) => {
        resolve(null);
    }) 
  })
} 


const imageUpload = async (file, callback) => {
  let _this = this
  if (file === undefined){
    if(callback) callback(null);
    return false;
  }
  let file_type = file.type
  let reset_nametype = false
  //修复安卓6
  if (file_type === null || file_type === '') {
    reset_nametype = true
  }
  let ossData = new FormData();
  let ossConfig = await getOssConfig("admin/");
  if(!ossConfig){
    if(callback) callback(null);
    return false;
  }
  // 添加配置参数
  let filename = file.name
  let sec_name = ''
  if (reset_nametype) {
    sec_name = 'jpg'
  } else {
    sec_name = filename.substring(filename.lastIndexOf('.') + 1) ///\.[^\.]+/.exec(filename);
  }
  ossData.append('OSSAccessKeyId', ossConfig.OSSAccessKeyId)
  ossData.append('policy', ossConfig.policy)
  ossData.append('Signature', ossConfig.signature)
  ossData.append(
    'key',
    ossConfig.startsWith + ossConfig.saveName + '.' + sec_name
  )
  ossData.append('success_action_status', 201) // 指定返回的状态码
  ossData.append('file', file, filename)
  axios({
    url: ossConfig.host,
    method: 'post',
    data: ossData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((data) => {
    var x2js = new X2JS();
    let json = x2js.xml2js(data);
    if (json.PostResponse) {
      let res = json.PostResponse
      let img_url = res.Location
      let filetype = img_url.substring(img_url.lastIndexOf('.') + 1)
      let arr = [
        'bmp',
        'BMP',
        'png',
        'PNG',
        'jpg',
        'JPG',
        'jpeg',
        'JPEG',
        'gif',
        'GIF',
      ]
      if (arr.indexOf(filetype) == '-1') {
        callback(null)
        return false
      } else {
        callback(img_url)
        return true;
      }
    }
  })
  .catch(function(error) {
    callback(null)
    console.log(error)
  })
  
  return false;
}




const fileUpload = async (file, callback) => {
  let _this = this
  if (file === undefined){
    if(callback) callback(null);
    return false;
  }
  let ossData = new FormData();
  let ossConfig = await getOssConfig("admin/");
  if(!ossConfig){
    if(callback) callback(null);
    return false;
  }
  // 添加配置参数
  let filename = file.name
  let sec_name = filename.substring(filename.lastIndexOf('.') + 1);

  ossData.append('OSSAccessKeyId', ossConfig.OSSAccessKeyId)
  ossData.append('policy', ossConfig.policy)
  ossData.append('Signature', ossConfig.signature)
  ossData.append(
    'key',
    ossConfig.startsWith + ossConfig.saveName + '.' + sec_name
  )
  ossData.append('success_action_status', 201) // 指定返回的状态码
  ossData.append('file', file, filename)
  axios({
    url: ossConfig.host,
    method: 'post',
    data: ossData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((data) => {
    var x2js = new X2JS();
    let json = x2js.xml2js(data);
    if (json.PostResponse) {
      let res = json.PostResponse
      let file_url = res.Location
      if(file_url && file_url != undefined){
        callback(file_url)
        return true;
      }else{
        callback(null)
        return false
      }
    }
  })
  .catch(function(error) {
    callback(null)
    console.log(error)
  })

  return false;
}

const fileUploadComplete = (file,ossConfig) =>{

  return new Promise((resolve,rejust) => {
    if (file === undefined){
      return resolve(null);
    }
    let ossData = new FormData();
    if(!ossConfig){
      return resolve(null);
    }
    // 添加配置参数
    let filename = file.name
    let sec_name = filename.substring(filename.lastIndexOf('.') + 1);
    ossData.append('OSSAccessKeyId', ossConfig.OSSAccessKeyId)
    ossData.append('policy', ossConfig.policy)
    ossData.append('Signature', ossConfig.signature)
    ossData.append(
      'key',
      ossConfig.startsWith + ossConfig.saveName + '.' + sec_name
    )
    ossData.append('success_action_status', 201) // 指定返回的状态码
    ossData.append('file', file, filename);
    axios({
      url: ossConfig.host,
      method: 'post',
      data: ossData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((data) => {
      var x2js = new X2JS();
      let json = x2js.xml2js(data);
      if (json.PostResponse) {
        let res = json.PostResponse
        let file_url = res.Location
        if(file_url && file_url != undefined){
          return resolve(file_url);
        }else{
          return resolve(null);
        }
      }
    })
    .catch(function(error) {
      console.log(error)
      return resolve(null);
    })
  })
}


const fileUploadSync = async (file) => {

  let ossConfig = await getOssConfig("admin/");
  let fileUrl = await fileUploadComplete(file,ossConfig);
  return fileUrl;
}


export {
  imageUpload,
  fileUpload,
  fileUploadSync
}