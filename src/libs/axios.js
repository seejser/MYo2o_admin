import axios from '../../node_modules/axios'
import qs from 'qs'

import BaseConfig from '@/config/config.js'
import { getLocalData,getData,saveData } from './utils.js'
export default (router, APP) => {
  axios.defaults.baseURL = BaseConfig.apiUrl
  axios.interceptors.request.use(
    function(config) {
      if (getLocalData('services_admin_token')) {
        const token = getLocalData('services_admin_token')
        if (token != undefined) {
          config.headers.token = token;
        }
      }
      if (
        config.method == 'post' &&
        config.headers['Content-Type'] != 'multipart/form-data'
      ) {
        config.data = qs.stringify(config.data)
      }
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    function(response) {
      let { code } = response.data;
      if(code == 400001){
        router.push({'name': 'Login'});
        APP.config.globalProperties.$message.error("请先登陆");
        return {};
      }
      return response.data;
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  return axios
}
