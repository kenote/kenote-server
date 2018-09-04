
import * as userProxy from '../proxys/user'
import { Code } from '../error'

export const login = (data, req, res, next) => {
  // -- 登录
  req.logIn(data, err => {
    if (err) { return next(err) }
    return res.api(data)
  })
}

export const logout = (req, res) => {
  // -- 退出
  req.logout()
  return res.redirect('/')
}

export const check = (req, res, next) => {
  // -- 查询账号
  let checkField = req.params.type
  checkField = checkField.replace('name', 'username')
  let typeName = {
    username: '用户名',
    email: '邮箱',
    phone: '手机号'
  }
  let query = { [checkField]: req.body.name }
  if (req.user) {
    let { auth } = req.user
    query = {
      ...query,
      _id: { $ne: auth._id }
    }
  }
  return userProxy.findOne(query)
    .then( ret => {
      if (ret) {
        return res.api(null, Code.ERROR_VALID_USERNAME_OCCUPY, [typeName[checkField]])
      }
      return res.api({ valid: true })
    })
    .catch( err => next(err) )
}

export const settings = (data, req, res, next) => {
  let auth = req.user
  return userProxy.updateInfo(auth._id, data)
    .then( ret => {
      return res.api(ret)
    })
    .catch( err => next(err) )
  //return res.api(data)
}