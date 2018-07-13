import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import compress from 'compression'
import cors from 'cors'
import passport from 'passport'

import { HOST, PORT } from './config'
import apiV1 from './routes/api_v1'
import { startegy } from './middlewares/auth'
import restful from './middlewares/restful'

const app = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(methodOverride())
app.use(compress())

passport.use(startegy)
app.use(passport.initialize())

app.use(restful)

app.use('/api/v1', cors(), apiV1)

if (!module.parent) {
  const server = http.createServer(app)
  server.listen(PORT, HOST, () => {
    console.log(`Service running in %s environment, PORT: %d ...`, process.env.NODE_ENV, PORT)
  })
}