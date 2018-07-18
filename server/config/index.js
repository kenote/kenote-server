
import * as utils from '../utils'

const project = utils.loadConfig(process.env.CONFIG_FILE)

module.exports = {
  HOST: '0.0.0.0',
  POST: 4000,
  session_secret: 'kenote_secret',
  jwt_sign: {
    expiresIn: '10h'
  },
  mongo: {
    uri: 'mongodb://localhost:27017/kenote_server'
  },
  ...project
}