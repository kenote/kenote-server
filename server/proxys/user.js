import Promise from 'bluebird'
import _ from 'lodash'
import { userDao as Dao } from '../models'
import { addAndUpdateKeys } from './seq'
import { callback, encryptPwd, validPassword, isNull } from '../utils'
import { Code, ErrorInfo } from '../error'
import * as groupProxy from './group'
import { setting as groupSetting } from '../config/group'
import { store } from '../config'

const populateStore = [
  {
    path: 'group',
    select: ['_id', 'id', 'name', 'level', 'store'],
    populate: {
      path: 'store',
      select: ['_id', 'upload_type']
    }
  }
]
const fieldStore = { _id: 1, id: 1, username: 1, group: 1, email: 1, avatar: 1, sex: 1, phone: 1, intro: 1, website: 1, repository: 1, wx_qrcode: 1, binds: 1, editor: 1, createAt: 1, updateAt: 1, jwToken: 1 }

const create = info => new Promise((resolve, reject) => {
  Dao.create(info, (err, doc) => callback(resolve, reject, err, doc))
})

export const findOne = (query, populate = null, fields = null) => new Promise((resolve, reject) => {
  Dao.model.findOne(query)
    .populate(populate || { path: '' })
    .select(fields)
    .exec((err, doc) => callback(resolve, reject, err, doc))
})

export const find = (query, populate = null, fields = null, sort = null, limit = 0, skip = 0) => new Promise((resolve, reject) => {
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
  if (info.phone) {
    queryInfo.push({ phone: info.phone })
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
      if (info.username && user.username === info.username) {
        throw ErrorInfo(Code.ERROR_USER_NAME_UNIQUE)
      }
      if (info.email && user.email === info.email) {
        throw ErrorInfo(Code.ERROR_USER_EMAIL_UNIQUE)
      }
      if (info.phone && user.phone === info.phone) {
        throw ErrorInfo(Code.ERROR_USER_PHONE_UNIQUE)
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

export const register = (info) => {
  let { unauthenticatedUser } = groupSetting
  return groupProxy.findOne({ level: unauthenticatedUser.level })
    .then( ret => {
      if (!ret) {
        return groupProxy.createGroup(unauthenticatedUser)
      }
      return ret
    })
    .then( group => {
      return createUser({ ...info, group: group._id })
    })
    .then( ret => _.pick(ret, Object.keys(fieldStore)) )
}

export const updateAvatar = (_id, avatar) => updateOne({ _id }, { avatar }).then( ret => findOne({ _id }, populateStore, fieldStore) )

export const updateInfo = (_id, info) => {

  return updateOne({ _id }, info)
    .then( ret => findOne({ _id }, populateStore, fieldStore) )
}



