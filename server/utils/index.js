export * from 'kenote-node-utils'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

export const getTransports = (mailer) => {
  let mailOpts = smtpTransport(mailer)
  return nodemailer.createTransport(mailOpts)
}