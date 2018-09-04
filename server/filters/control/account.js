
import { filterData, isNull } from '../../utils'
import Rules from '../../config/rules'
import { Code, Message } from '../../error'
import util from 'util'
import _ from 'lodash'

const rules = {
  username: [
    { required: true, message: Message.ERROR_VALID_USERNAME_REQUIRED, code: Code.ERROR_VALID_USERNAME_REQUIRED },
    Rules.username
  ],
  password: [
    { required: true, message: Message.ERROR_VALID_PASSWORD_REQUIRED, code: Code.ERROR_VALID_PASSWORD_REQUIRED },
    Rules.password
  ],
  email: [
    { required: true, message: Message.ERROR_VALID_EMAIL_REQUIRED, code: Code.ERROR_VALID_EMAIL_REQUIRED },
    Rules.email
  ],
  phone: [
    { required: true, message: Message.ERROR_VALID_PHONE_REQUIRED, code: Code.ERROR_VALID_PHONE_REQUIRED },
    Rules.phone
  ]
}

export const register = (req, res, next) => {
  // -- 注册
  let { username, email, phone, password } = req.body
  let filters = [
    { key: 'username', rules: rules.username, value: username },
    { key: 'email', rules: rules.email, value: email, ignore: true },
    { key: 'phone', rules: rules.phone, value: phone, ignore: true },
    { key: 'password', rules: rules.password, value: password }
  ]
  let options = {
    picks: [
      { 
        data: [ email, phone ],
        message: util.format(Message.ERROR_VALID_CHOOSEONE_MORE, '邮箱、手机号'), 
        code: Code.ERROR_VALID_CHOOSEONE_MORE 
      }
    ]
  }
  filterData(filters, (data, message) => {
    if (message) {
      return res.api(null, message)
    }
    return next(data)
  }, options)
}

export const settings = (req, res, next) => {
  let { nickname, email, phone, editor, sex, intro, website, repository } = req.body
  let filters = []
  if (nickname) {
    filters.push({ key: 'nickname', rules: [Rules.nickname], value: nickname })
  }
  if (email) {
    filters.push({ key: 'email', rules: [Rules.email], value: email })
  }
  if (phone) {
    filters.push({ key: 'phone', rules: [Rules.phone], value: phone })
  }
  if (editor) {
    filters.push({ key: 'editor', rules: [], value: editor })
  }
  if (!isNull(sex)) {
    filters.push({ key: 'sex', rules: [], value: sex })
  }
  if (intro) {
    filters.push({ key: 'intro', rules: [Rules.intro], value: intro, label: '个人简介' })
  }
  if (website) {
    filters.push({ key: 'website', rules: [Rules.website], value: website, label: '个人网站' })
  }
  if (repository) {
    filters.push({ key: 'repository', rules: [Rules.website], value: repository, label: `%s地址` })
  }
  filterData(filters, (data, message) => {
    if (message) {
      return res.api(null, message)
    }
    console.log(data)
    return next(data)
  })
  //return next(data)
}