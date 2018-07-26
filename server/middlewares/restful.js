
import fs from 'fs-extra'
import mime from 'mime-types'
import _ from 'lodash'
import { Code, ErrorInfo } from '../error'
import { mimeTypes } from '../config'
import Status from '../config/status'
import * as imageUtil from '../utils/image'

export default (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
  res.setHeader('X-Powered-By', 'Kenote')
  // API
  res.api = (data, code = Code.ERROR_STATUS_NULL, opts = null) => {
    let info = { 
      data, 
      Status: ErrorInfo(code, opts, true) || null
    }
    console.log('Restful API %s:', req.method, req.url, JSON.stringify(info, null, 2))
    return res.json(info)
  }
  // Download
  res.download = async (file, draw = false) => {
    let fileStream = fs.readFileSync(file)
    let mimeType = mime.lookup(file)
    if (mimeTypes.display.indexOf(mimeType) > -1 && !_.has(req.query, 'down')) {
      res.setHeader('Content-Type', mimeType)
    }
    if (mimeTypes.image.indexOf(mimeType) > -1) {
      let thumbOpts = req.query.show || req.query.down
      if (thumbOpts) {
        let options = _.zipObject(['width', 'height'], thumbOpts.split(/\|/))
        options.width = _.toInteger(options.width) > 0 ? _.toInteger(options.width) : 150
        options.height = _.toInteger(options.height) > 0 ? _.toInteger(options.height) : options.width
        options.draw = draw
        try {
          fileStream = await imageUtil.thumbnail(file, options)
        } catch (error) {
          console.error(error)
        }
      }
      else if (draw) {
        fileStream = await imageUtil.toBuffer(file)
      }
    }
    return res.send(fileStream)
  }
  // Not Found
  res.notfound = () => res.status(404).render('error', { statusCode: 404, ...Status[404] })

  return next()
}