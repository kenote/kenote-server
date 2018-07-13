import jwt from 'jsonwebtoken'
import passport from 'passport'
import passwordJWT from 'passport-jwt'
import { session_secret } from '../config'
import * as userProxy from '../proxys/user'
import { CustomError, Code } from '../error'
import * as utils from '../utils'

const { ExtractJwt, Strategy } = passwordJWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
  secretOrKey: session_secret
}

export const startegy = new Strategy(jwtOptions, async (req, jwt_payload, next) => {
  let user = await userProxy.accessToken({ _id: jwt_payload._id })
  if (user) {
    let level = user.group.level
    let isAccess = req.baseUrl === jwt_payload.baseUrl && utils.isAccess(req.baseUrl, { level })
    if (isAccess) {
      next(null, user)
    }
    else {
      next(null, false)
    }
  } else {
    next(null, false)
  }
})

export const login = async (req, res, next) => {
  let { username, password } = req.body
  try {
    let auth = await userProxy.login({ username, password })
    let level = auth.group.level
    let isAccess = utils.isAccess(req.baseUrl, { level })
    if (!isAccess) {
      return res.api(null, Code.ERROR_LICENSE_PGAE)
    }
    let payload = { _id: auth._id, baseUrl: req.baseUrl }
    let token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: '10h' })
    return next({ auth, token })
  } catch (error) {
    if (CustomError(error)) {
      return res.api(null, error.code)
    }
    return next(error)
  }
  
}

export const accessToken = passport.authenticate('jwt', { session: false })