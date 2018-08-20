import Promise from 'bluebird'
import { groupDao as Dao } from '../models'
import { addAndUpdateKeys } from './seq'
import { callback } from '../utils'
import { isMaster } from '../config/group'
import { ErrorInfo } from '../error'
import * as storeProxy from './store'

const populateStore = [
  {
    path: 'store',
    select: ['_id', 'upload_type']
  }
]

const create = info => new Promise((resolve, reject) => {
  Dao.create(info, (err, doc) => callback(resolve, reject, err, doc))
})

export const findOne = (query, populate = null, fields = null) => new Promise((resolve, reject) => {
  Dao.model.findOne(query)
    .populate(populate || { path: '' })
    .select(fields)
    .exec((err, doc) => callback(resolve, reject, err, doc))
})

const find = (query, populate = null, fields = null, sort = null, limit = 0, skip = 0) => new Promise((resolve, reject) => {
  Dao.model.find(query)
    .populate(populate || populateStore)
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

export const createGroup = info => {
  let start = () => new Promise((resolve) => resolve(0))
  info = { level: 1000, ...info }
  if (isMaster(info.level)) {
    start = () => counts({ level: info.level })
  }
  return start()
    .then( ret => {
      if (ret > 0) {
        throw ErrorInfo(CODE.ERROR_GROUP_MASTER_ONLY)
      }
      return Promise.all([
        addAndUpdateKeys('group'),
        storeProxy.createStore(info.store || null)
      ])
    })
    .then( ([id, store]) => create({ ...info, id, store: store._id }))
    .then( ret => Promise.promisifyAll(ret).populateAsync(populateStore) )
}