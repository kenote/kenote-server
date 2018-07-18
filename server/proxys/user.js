import Promise from 'bluebird'
import _ from 'lodash'
import { userDao as Dao } from '../models'
import { addAndUpdateKeys } from './seq'
import { callback, encryptPwd, validPassword } from '../utils'
import { Code, ErrorInfo } from '../error'

const populateStore = [
  {
    path: 'group',
    select: ['_id', 'id', 'name', 'level']
  }
]
const fieldStore = { _id: 1, id: 1, username: 1, group: 1, email: 1, avatar: 1, phone: 1, createAt: 1, updateAt: 1, jwToken: 1 }

const create = info => new Promise((resolve, reject) => {
  Dao.create(info, (err, doc) => callback(resolve, reject, err, doc))
})

const findOne = (query, populate = null, fields = null) => new Promise((resolve, reject) => {
  Dao.model.findOne(query)
    .populate(populate || { path: '' })
    .select(fields)
    .exec((err, doc) => callback(resolve, reject, err, doc))
})

const find = (query, populate = null, fields = null, sort = null, limit = 0, skip = 0) => new Promise((resolve, reject) => {
  Dao.model.find(query)
    .populate(populate || { path: '' })
    .select(fields)
    .sort(sort || { _id: -1 })
    .limit(limit)
    .skip(skip)
    .exec((err, doc) => callback(resolve, reject, err, doc))
})

export const counts = (query = null) => new Promise((resolve, reject) => {
  Dao.model.collection.countDocuments(query, (err, doc) => callback(resolve, reject, err, doc))
})

const updateOne = (query, info) => new Promise( (resolve, reject) => {
  Dao.updateOne(query, info, (err, doc) => callback(resolve, reject, err, doc))
})

const update = (query, info) => new Promise( (resolve, reject) => {
  Dao.update(query, info, (err, doc) => callback(resolve, reject, err, doc))
})

const remove = query => new Promise( (resolve, reject) => {
  Dao.delete(query, err => callback(resolve, reject, err))
})

const removeAll = () => new Promise( (resolve, reject) => {
  Dao.deleteAll( err => callback(resolve, reject, err))
})

const dropAllIndexes = () => new Promise( (resolve, reject) => {
  Dao.model.collection.dropAllIndexes((err, result) => callback(resolve, reject, err, result))
})

export const clear = () => removeAll().then(dropAllIndexes)

export const createUser = info => {
  let queryInfo = []
  if (info.username) {
    queryInfo.push({ username: info.username })
  }
  if (info.email) {
    queryInfo.push({ email: info.email })
  }
  let password = null
  if (info.password) {
    let salt = Math.random().toString(36).substr(8)
    password = encryptPwd(info.password, salt)
    _.unset(info, 'password')
  }
  return findOne({ $or: queryInfo })
    .then( user => {
      if (!user) {
        return addAndUpdateKeys('user')
      }
      if (info.username && ret.username === info.username) {
        throw ErrorInfo(Code.ERROR_USER_NAME_UNIQUE)
      }
      if (info.email && ret.email === info.email) {
        throw ErrorInfo(Code.ERROR_USER_EMAIL_UNIQUE)
      }
    })
    .then( ret => create({ ...info, ...password, id: ret }) )
    .then( ret => Promise.promisifyAll(ret).populateAsync(populateStore) )
}

export const login = info => {
  let { username, password } = info
  let query = {
    $or: [
      { username: username },
      { email: username }
    ]
  }
  return findOne(query)
    .then( user => {
      if (!user) throw ErrorInfo(Code.ERROR_LOGINVALID_FAIL)
      let valide = validPassword(password, user.salt, user.encrypt)
      if (!valide) throw ErrorInfo(Code.ERROR_LOGINVALID_FAIL)
      let last = {
        lastTime: new Date(),
        lastOnlineTime: new Date(),
        onlineDuration: 0
      }
      return updateOne(query, last)
    })
    .then( ret => findOne(query, populateStore, fieldStore) )
}

export const accessToken = query => findOne(query, populateStore, fieldStore)

export const updateToken = (_id, jwToken) => updateOne({ _id }, { jwToken })