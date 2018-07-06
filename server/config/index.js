
import * as utils from '../utils'

const project = utils.loadConfig(process.env.CONFIG_FILE)

module.exports = {
  HOST: '0.0.0.0',
  POST: 4000,
  ...project
}