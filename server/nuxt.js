import { Nuxt, Builder } from 'nuxt'
import nuxtConfig from '../nuxt.config.js'
import * as auth from './middlewares/auth'
import * as userProxy from './proxys/user'

// Init Nuxt.js
nuxtConfig.dev = process.env.NODE_ENV !== 'production'
const nuxt = new Nuxt(nuxtConfig)

module.exports = app => {
  // Build only in dev mode
  if (process.env.NODE_ENV === 'development') {
    const builder = new Builder(nuxt)
    builder.build()
  }
  app.use(accessToken, nuxt.render)
}

const accessToken = async (req, res, next) => {
  let isTrue = /^(\/\_nuxt|\/__webpack_hmr)/.test(req.path)
  if (req.user && !isTrue) {
    let { auth, token } = req.user
    let newAuth = await userProxy.accessToken({ _id: auth._id })
    if (newAuth && newAuth.jwToken === token) {
      req.logIn({ auth: newAuth, token: newAuth.jwToken }, err => {
        if (err) { return next(err) }
      })
    }
    else {
      req.logout()
    }
  }
  return next()
}