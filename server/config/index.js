
import * as utils from '../utils'

const project = utils.loadConfig(process.env.CONFIG_FILE)

module.exports = {
  HOST: '0.0.0.0',
  POST: 4000,
  site_name: 'Kenote',
  site_url: 'http://0.0.0.0:4000',
  session_secret: 'kenote_secret',
  store_root: 'uploadfile',
  jwt_sign: {},
  mongo: {
    uri: 'mongodb://localhost:27017/kenote_server'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0
  },
  mailer: {
    host: 'smtp.mxhichina.com',
    port: 25,
    auth: {
      user: 'user@mxhichina.com',
      pass: 'password'
    }
  },
  store: {},
  mimeTypes: {
    display: []
  },
  ...project
}