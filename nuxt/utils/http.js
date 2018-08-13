import axios from 'axios'
import * as storage from './storage'

export const accesstoken = async () => await $get('/account/accesstoken')

export const login = async ({ username, password }) => await $post('/account/login', { username, password })

export const upload = async (options = { type: 'files', dir: null }, files = [], done = null, headers = {}) => {
  let formData = new FormData()
  for (let item of files) {
    formData.append('files[]', item)
  }
  await $upload(`/upload/${options.type}`, formData, done, headers)
}

export const $get = async (url, params = null, opts = {}) => {
  let headers = getHeaders(opts)
  let options = {
    method: 'get',
    url,
    params,
    headers
  }
  return await getResponseData(options)
}

export const $post = async (url, data, opts = {}) => {
  let headers = getHeaders(opts)
  let options = {
    method: 'post',
    url,
    data,
    headers
  }
  return await getResponseData(options)
}

export const $upload = async (url, data, done, opts = {}) => {
  if (opts.opts) {
    opts.opts = { ...opts.opts, 'Content-Type': 'multipart/form-data' }
  }
  else {
    opts.opts = { 'Content-Type': 'multipart/form-data' }
  }
  let headers = getHeaders(opts)
  let options = {
    method: 'post',
    url,
    data,
    headers,
    transformRequest: [function (data, headers) {
      return data
    }],
    onUploadProgress: function (progressEvent) {
      let percentage = Math.round((e.loaded * 100) / e.total) || 0
      if (percentage < 100) {
        console.log(percentage + '%')  // 上传进度
        done(percentage)
      }
    },
  }
  return await getResponseData(options)
}

const getResponseData = async options => {
  try {
    let response = await axios(options)
    if (response.status >= 200 && response.status < 300) {
      let responseData = response.data || {}
      return responseData
    }
    throw new Error(response.statusText)
  } catch (error) {
    throw error
  }
}

export const getHeaders = (options = {}) => {
  let { token, opts } = options
  let headers = opts
  if (token) {
    headers = { 'Authorization': `Bearer ${token}`, ...headers }
  }
  return headers
}