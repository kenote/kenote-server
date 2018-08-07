import localforage from 'localforage'

const TOKEN_KEY = 'token'

export const getItem = localforage.getItem

export async function setItem (key, value) {
  if (value === null) return Promise.reject('StorageService Error: value should not be null or undefined')
  return await localforage.setItem(key, value)
}

export async function removeItem (key) {
  return await localforage.removeItem(key)
}

export async function clear () {
  return await localforage.clear()
}

export const getToken = async () => await getItem(TOKEN_KEY)

export const setToken = async value => await setItem(TOKEN_KEY, value)