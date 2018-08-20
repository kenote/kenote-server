import _ from 'lodash'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import passwordJWT from 'passport-jwt'
import { session_secret } from '../config'
import * as userProxy from '../proxys/user'
import { CustomError, Code } from '../error'
import * as utils from '../utils'
import access from '../config/access'

const { ExtractJwt, Strategy } = passwordJWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
  secretOrKey: session_secret
}

export const startegy = new Strategy(jwtOptions, async (req, jwt_payload, done) => {
  let auth = await userProxy.accessToken({ _id: jwt_payload._id })
  if (auth) {
    let level = auth.group.level
    let isAccess = utils.isAccess({ level }, access[req.baseUrl])
    if (isAccess && req.headers.authorization.split(/\s+/)[1] === auth.jwToken) {
      done(null, auth)
    }
    else {
      done(null, false)
    }
  } else {
    done(null, false)
  }
})

export const login = async (req, res, next) => {
  let { username, password } = req.body
  try {
    let auth = await userProxy.login({ username, password })
    let level = auth.group.level
    let isAccess = utils.isAccess({ level }, access[req.baseUrl])
    if (!isAccess) {
      return res.api(null, Code.ERROR_LICENSE_PGAE)
    }
    let token = setToken(auth)
    await userProxy.updateToken(auth._id, token)
    return next({ auth, token })
  } catch (error) {
    if (CustomError(error)) {
      return res.api(null, error.code)
    }
    return next(error)
  }
}

export const register = async (data, req, res, next) => {
  // -- 注册
  try {
    let auth = await userProxy.register(data)
    let token = setToken(auth)
    await userProxy.updateToken(auth._id, token)
    return next({ auth, token })
  } catch (error) {
    if (CustomError(error)) {
      return res.api(null, error.code)
    }
    return next(error)
  }
}

export const accessToken = passport.authenticate('jwt', { session: false })

const setToken = auth => jwt.sign(
  {
    _id: auth._id
  }, 
  jwtOptions.secretOrKey
)