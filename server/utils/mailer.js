import path from 'path'
import async from 'async'
import fs from 'fs-extra'
import html2text from 'html-to-text'
import nunjucks from 'nunjucks'
import mjml2html from 'mjml'
import { getTransports } from './index'
import { mailer, site_name } from '../config'

const transports = getTransports(mailer)
const mailDir = path.resolve(process.cwd(), 'mails')

export const asyncSend = data => {
  let options = { times: 5, interval: 200 }
  data = {
    from: `${site_name}服务 <${mailer.auth.user}>`,
    ...data
  }
  async.retry(options, done => {
    transports.sendMail(data, err => {
      if (err) {
        console.error('Send Mail Error', err, data) 
      }
      return done()
    })
  }, err => {
    if (err) {
      return console.error('Send Mail Finally Error', err, data)
    }
    console.log('Send Mail Success', data)
  })
}

export const renderString = (mailFile, options = null) => {
  let extname = path.extname(mailFile)
  let mjmlFile = path.resolve(mailDir, mailFile)
  let tplString = ''
  try {
    let mjnlString = fs.readFileSync(mjmlFile, 'utf-8')
    tplString = /\.(mjml)/.test(extname) ? mjml2html(mjnlString).html : mjnlString
  } catch (error) {
    console.error(error)
  }
  let htmlString = options ? nunjucks.renderString(tplString, options) : tplString
  return htmlString
}

export const sendMail = (tpl, data, opts = null) => {
  let html = renderString(tpl, opts)
  let text = html2text.fromString(html)
  asyncSend({ ...data, html, text })
}