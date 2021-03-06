import _ from 'lodash'
import util from 'util'
import inquirer from 'inquirer'
import rules from './config/rules'
import * as seqProxy from './proxys/seq'
import * as grouProxy from './proxys/group'
import * as userProxy from './proxys/user'
import * as storeProxy from './proxys/store'
import { setting as groupSetting } from './config/group'

const questions = [
  {
    type: 'input',
    name: 'username',
    message: '设置管理员账号: ',
    default: 'admin',
    validate: value => {
      let { pattern, message } = rules['username']
      let isUsername = new RegExp(pattern).test(value)
      if (!isUsername) {
        return util.format(message, '管理员账号')
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'password',
    message: '设置管理员密码: ',
    default: 'admin888',
    validate: value => {
      let { pattern, message } = rules['password']
      let isPassword = new RegExp(pattern).test(value)
      if (!isPassword) {
        return util.format(message, '管理员')
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'email',
    message: '设置管理员邮箱: ',
    validate: value => {
      let val = _.trim(value)
      if (val.length === 0) {
        return '邮箱地址不能为空！'
      }
      let { pattern, message } = rules['email']
      let isEmail = new RegExp(pattern).test(val)
      if (!isEmail) {
        return message
      }
      return true
    }
  }
]

const initialize = async () => {
  try {
    let userData = await inquirer.prompt(questions)
    await Promise.all([ seqProxy.clear(), grouProxy.clear(), userProxy.clear(), storeProxy.clear() ])
    let groups = {}
    for (let key of _.keys(groupSetting)) {
      groups[key] = await grouProxy.createGroup(groupSetting[key])
    }
    let user = await userProxy.createUser({ ...userData, binds: ['email'], group: groups['Creator']._id })
    console.log(user)
    process.exit(0)
    
  } catch (error) {
    console.log(error)
    process.exit(0)
  }
}

!module.parent && initialize()