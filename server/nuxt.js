import { Nuxt, Builder } from 'nuxt'
import nuxtConfig from '../nuxt.config.js'

// Init Nuxt.js
nuxtConfig.dev = process.env.NODE_ENV !== 'production'
const nuxt = new Nuxt(nuxtConfig)

module.exports = app => {
  // Build only in dev mode
  if (process.env.NODE_ENV === 'development') {
    const builder = new Builder(nuxt)
    builder.build()
  }
  app.use(nuxt.render)
}