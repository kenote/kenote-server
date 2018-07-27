import http from 'http'
import path from 'path'
import fs from 'fs-extra'
import express from 'express'
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import compress from 'compression'
import cors from 'cors'
import errorhandler from 'errorhandler'
import passport from 'passport'

import { HOST, PORT } from './config'
import Status from './config/status'
import controller from './routes'
import apiV1 from './routes/api_v1'
import { startegy } from './middlewares/auth'
import restful from './middlewares/restful'
import Nuxt from './nuxt'

const app = express()
const staticDir = path.resolve(process.cwd(), 'public')
const viewsDir  = path.resolve(process.cwd(), 'views')

!fs.existsSync(staticDir) && fs.mkdirpSync(staticDir)

// Views
app.set('views', viewsDir)
app.set('view engine', 'njk')
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// Bodys
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(methodOverride())
app.use(compress())

// Oauth
passport.use(startegy)
app.use(passport.initialize())

// Middlewares
app.use(restful)

// Static
app.use(express.static(staticDir))

// Routes
app.use('/', controller)
app.use('/api/v1', cors(), apiV1)

// Nuxt
Nuxt(app)

// 404 Not Found
app.use('*', (req, res) => {
  console.error('status:404; url:', req.method, req.originalUrl)
  return res.status(404).render('error', { statusCode: 404, ...Status[404] })
})

// 500 Error
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}
else {
  app.use( (err, req, res, next) => {
    console.error('server 500 error: ', err)
    return res.status(500).render('error', { statusCode: 500, ...Status[500] })
  })
}

// Starting ...
if (!module.parent) {
  const server = http.createServer(app)
  server.listen(PORT, HOST, () => {
    console.log(`Service running in %s environment, PORT: %d ...`, process.env.NODE_ENV, PORT)
  })
}