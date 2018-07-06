import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import compress from 'compression'

import { HOST, PORT } from './config'

const app = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))
app.use(methodOverride())
app.use(compress())


if (!module.parent) {
  const server = http.createServer(app)
  server.listen(PORT, HOST, () => {
    console.log(`Service running in %s environment, PORT: %d ...`, process.env.NODE_ENV, PORT)
  })
}