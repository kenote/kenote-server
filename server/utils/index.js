export * from 'kenote-node-utils'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import path from 'path'

export const getTransports = (mailer) => {
  let mailOpts = smtpTransport(mailer)
  return nodemailer.createTransport(mailOpts)
}

export const getPath = (value, dir = 'uploadfile') => value.replace(/^\@/, path.resolve(process.cwd(), dir) + '/')

export const getStoreKeys = (store, type = null) => {
  let keys = Object.keys(store)
  if (!type) return keys
  let out_keys = []
  for (let item of keys) {
    if (store[item].store === type) out_keys.push(item)
  }
  return out_keys
}

export const getUrl = (value, dir = 'uploadfile') => value.replace(/^\@/, '/uploadfile/')