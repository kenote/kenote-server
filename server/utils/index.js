export * from 'kenote-node-utils'
import crypto from 'crypto'
import _ from 'lodash'
import access from '../config/access'

const salt_len = 12
const ran_num = 8
const ran_str = 'abcdefghijkmnpqrstuvwxyz0123456789ABCDEFGHJKMNPQRSTUVWXYZ@$!%*#?&'

export const callback = (resolve, reject, err, doc = null) => {
  if (err) {
    reject(err)
  }
  else {
    resolve(doc)
  }
}

export const loadError = (Code, Message) => {
  let errors = []
  for (let e in Code) {
    errors.push({
      code: Code[e],
      message: Message[e]
    })
  }
  return errors
}

export const random = (len = ran_num, char = ran_str) => {
  let str = ''
  for (let i = 0; i < len; i++) {
    let idx = _.random(0, char.length - 1)
    let idstr = char.slice(idx, idx + 1)
    str = `${str}${idstr}`
  }
  return str
}

export const md5 = text => crypto.createHash('md5').update(text).digest('hex')
export const sha1 = text => crypto.createHash('sha1').update(text).digest('hex')

const getEncryptPwd = (pwd, salt) => sha1(`${md5(pwd)}^${salt}`)

export const encryptPwd = str => {
  let salt = random(salt_len)
  let encrypt = getEncryptPwd(str, salt)
  return { salt, encrypt }
}

export const validPassword = (pwd, salt, encrypt) => encrypt === getEncryptPwd(pwd, salt)

export const isAccess = (baseUrl, auth) => {
  let acc = access[baseUrl]
  if (!acc) return true
  let result = true
  if (_.has(acc, 'level')) {
    result = acc.level(auth.level)
  }
  return result
}