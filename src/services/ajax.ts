/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd'
import axios from 'axios'

const instance = axios.create({
  timeout: 10 * 1000,
})

// 添加请求拦截器
//
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
// 对响应数据做一些统一的处理
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    console.log(response)
    const resData = (response.data || {}) as ResType
    const { errno, data = {}, msg } = resData
    if (errno !== 0) {
      // 请求失败
      if (msg) {
        message.error(msg)
      }
      throw new Error(msg)
    }
    // 返回值是需要包含response 对象的
    // 所以不能直接return data
    return Promise.resolve({
      ...response,
      data,
    })
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
