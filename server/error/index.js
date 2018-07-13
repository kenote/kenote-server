import _ from 'lodash'
import * as Code from './code'
import * as Message from './message'

export { Code, Message }

export const ErrorInfo = (code, opts = null, json = false) => {
  let info = { code }
  for (let e in Code) {
    if (Code[e] === code) {
      info['message'] = Message[e]
      break
    }
  }
  if (info && _.isArray(opts)) {
    opts.splice(0, 0, info['message'])
    info['message'] = util.format(...opts)
  }
  if (json) return info
  const error = new Error(info.message)
  error.code = info.code
  return error
}

export const CustomError = e => e.code >= 1000