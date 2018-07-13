
import { Code, ErrorInfo } from '../error'

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

  return next()
}