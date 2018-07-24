
import fs from 'fs-extra'
import mime from 'mime-types'
import _ from 'lodash'
import { Code, ErrorInfo } from '../error'
import { mimeTypes } from '../config'
import Status from '../config/status'

export default (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
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
  res.download = (file) => {
    let fileStream = fs.readFileSync(file)
    let mimeType = mime.lookup(file)
    if (mimeTypes.display.indexOf(mimeType) > -1 && !_.has(req.query, 'down')) {
      res.setHeader('Content-Type', mimeType)
    }
    return res.send(fileStream)
  }
  // Not Found
  res.notfound = () => res.status(404).render('error', { statusCode: 404, ...Status[404] })

  return next()
}