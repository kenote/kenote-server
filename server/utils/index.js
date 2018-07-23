export * from 'kenote-node-utils'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import path from 'path'

export const getTransports = (mailer) => {
  let mailOpts = smtpTransport(mailer)
  return nodemailer.createTransport(mailOpts)
}

export const getPath = (value, dir = 'uploadfile') => value.replace(/^\@/, path.resolve(process.cwd(), dir) + '/')