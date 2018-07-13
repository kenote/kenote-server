import { seqDao as Dao } from '../models'
import { callback } from '../utils'

const create = info => new Promise((resolve, reject) => {
  Dao.create(info, (err, doc) => callback(resolve, reject, err, doc))
})

const findOne = info => new Promise((resolve, reject) => {
  Dao.one(info, (err, doc) => callback(resolve, reject, err, doc))
})

const updateOneSeq = (query, start = 1) => new Promise((resolve, reject) => {
  Dao.one(query, (err, doc) => {
    if (!err && doc) {
      doc.seq = doc.seq < start ? start : doc.seq + 1
      doc.save()
    }
    return callback(resolve, reject, err, doc)
  })
})

const removeAll = () => new Promise((resolve, reject) => {
  Dao.deleteAll( err => callback(resolve, reject, err) )
})

const dropAllIndexes = () => new Promise((resolve, reject) => {
  Dao.model.collection.dropAllIndexes((err, result) => callback(resolve, reject, err, result))
})

export const clear = () => removeAll().then(dropAllIndexes)

export const addAndUpdateKeys = (model, start = 1) => findOne({ model })
  .then( ret => {
    if (ret) {
      return updateOneSeq({ model }, start)
    }
    else {
      return create({ model, seq: start })
    }
  })
  .then( ret => ret.seq || 1 )

export const updateLastKeys = (model, start) => new Promise((resolve, reject) => {
  Dao.updateOne({ model }, { seq: start }, (err, doc) => callback(resolve, reject, err, doc))
})
