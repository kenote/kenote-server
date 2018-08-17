
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

export const check = (req, res) => {
  // -- 查询账号
  let checkField = req.params.type
  checkField = checkField.replace('name', 'username')
  let typeName = {
    username: '用户名',
    email: '邮箱',
    phone: '手机号'
  }
  return userProxy.counts({ [checkField]: req.body.name })
    .then( counts => {
      if (counts > 0) {
        return res.api(null, Code.ERROR_VALID_USERNAME_OCCUPY, [typeName[checkField]])
      }
      return res.api({ valid: true })
    })
    .catch( err => next(err) )
}

export const register = (data, req, res, next) => {
  // -- 注册
  let { username, email, phone, password } = data

  return res.api(data)
}