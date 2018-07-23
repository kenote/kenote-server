import Promise from 'bluebird'
import _ from 'lodash'
import { storeDao as Dao } from '../models'
import { addAndUpdateKeys } from './seq'
import { callback } from '../utils'
import { Code, ErrorInfo } from '../error'

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

export const createStore = (info = null) => addAndUpdateKeys('store').then( ret => create({ ...info, id: ret }) )