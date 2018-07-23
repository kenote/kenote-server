import mongoose from 'mongoose'
import Promise from 'bluebird'
import { mongo } from '../config'
import * as utils from '../utils'

const options = utils.getMongooseOptions(mongoose.version)

mongoose.Promise = Promise
mongoose.connect(mongo.uri, options, err => {
  if (err) {
    console.error(`connect to ${mongo.uri} error: ${err.message}`)
    process.exit(1)
  }
})

export { default as seqDao } from './seq'
export { default as groupDao } from './group'
export { default as userDao } from './user'
export { default as storeDao } from './store'