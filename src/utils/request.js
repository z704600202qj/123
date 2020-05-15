/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios' // 引入axios
import Qs from 'qs' // 引入qs模块，用来序列化post类型的数据
import Router from '../router/index'

import {
  Message
} from 'element-ui'

import {
  checkStatus
} from './utils' // 处理函数

// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  timeout: 30000, // 请求超时时间
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理
    return data
  }],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data
  }]
})
// 实例添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做处理...
  let token = localStorage.getItem('token')
  // let {token} = JSON.parse(tokenid2) || {token: ''}

  config.headers = Object.assign(config.method === 'get' ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'Content-Type': 'application/json; charset=UTF-8'
  }, {'x-token': token, ...config.headers})

  if (config.method === 'post') {
    const contentType = config.headers['Content-Type']
    // 根据Content-Type转换data格式
    if (contentType) {
      if (contentType.includes('multipart')) { // 类型 'multipart/form-data;'
        // config.data = data;
      } else if (contentType.includes('json')) { // 类型 'application/json;'
        // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
        config.data = JSON.stringify(config.data)
      } else { // 类型 'application/x-www-form-urlencoded;'
        // 服务器收到的raw body(原始数据) name=nowThen&age=18
        config.data = Qs.stringify(config.data)
      }
    }
  }
  return Promise.resolve(config)
}, function (error) {
  // 对请求错误做处理...
  return Promise.reject(error)
})

// 实例添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做处理，以下根据实际数据结构改动！！...
  if (response.headers['x-token']) {
    localStorage.setItem('token', response.headers['x-token'])
  }

  // const { reason_code } = response.data || {};
  // if (reason_code === '001') { // 请求超时，跳转登录页
  //   const instance = Toast('请求超时，即将跳转到登录页面...');
  //   setTimeout(() => {
  //     instance.close();
  //     window.location.href = '/login';
  //   }, 3000)
  // }
  return Promise.resolve(checkStatus(response))
}, function (error) {
  // 对响应错误做处理...
  if (error.response) {
    return Promise.reject(checkStatus(error.response))
  } else if (
    error.code === 'ECONNABORTED' &&
    error.message.indexOf('timeout') !== -1
  ) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      msg: '请求超时'
    })
  } else {
    return Promise.reject({})
  }
})

let baseUrl = process.env.API // 这里是一个默认的url，可以没有

// request.js
const request = async function (opt) {
  let options
  try {
    options = Object.assign({
      method: 'get',
      ifHandleError: false, // 是否统一处理接口失败(提示)
      ifHandleOk: false
    }, opt)
    // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
    options.baseURL = baseUrl

    const res = await instance(options)
    let parseData = JSON.parse(res)
    if (parseData.Code !== 0 && options.ifHandleError) { // 自定义参数，是否允许全局提示错误信息
      Message.error(parseData.Msg || '请求处理失败！')
    }
    if (parseData.Code === 0 && options.ifHandleOk) { // 自定义参数，是否允许全局提示错误信息
      Message.success(parseData.Msg || '操作成功')
    }
    if (parseData.Code === 2 && window.location.href.indexOf('details') === -1) { // 自定义参数，是否允许全局提示错误信息
      Router.push('/login')
    }
    if (parseData.Code === 2 && parseData.Msg === '登陆过期，请重新登陆') { // 自定义参数，是否允许全局提示错误信息
      Router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('info')
    }
    return parseData
  } catch (err) {
    if (options.ifHandleError) { // 自定义参数，是否允许全局提示错误信息
      Message.error('请求处理失败！')
    }
    return err
  }
}

export default request
