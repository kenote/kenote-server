import axios from 'axios'
import * as storage from './storage'

export const accesstoken = async () => await $get('/account/accesstoken')

export const login = async ({ username, password }) => await $post('/account/login', { username, password })

export const $get = async (url, params = null) => {
  let headers = await getHeaders()
  let options = {
    method: 'get',
    url,
    params,
    headers
  }
  return await getResponseData(options)
}

export const $post = async (url, data) => {
  let headers = await getHeaders()
  let options = {
    method: 'post',
    url,
    data,
    headers
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

export const getHeaders = async (headers = null) => {
  let token = await storage.getToken()
  if (token) {
    headers = { 'Authorization': `Bearer ${token}`, ...headers }
  }
  return headers
}