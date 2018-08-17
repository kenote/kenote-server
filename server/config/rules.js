import util from 'util'
import { Code, Message } from '../error'

export default {
  ['username']: {
    pattern: '^[a-zA-Z]{1}[a-zA-Z0-9_]{3,11}$',
    message: util.format(Message.ERROR_VALID_USERNAME_FORMAT, '%s', '因由英语字母、数字和下划线组成，且必须英语字母开头，长度在4～12字符之间 !'),
    code: Code.ERROR_VALID_USERNAME_FORMAT
  },
  ['password']: {
    pattern: '^(?=.*[A-Za-z])[A-Za-z0-9$@$!%*#?&]{6,32}$',
    message: util.format(Message.ERROR_VALID_PASSWORD_FORMAT, '%s', '因由英语字母、数字和特殊字符[$@$!%*#?&]组成，且至少一个英语字母，长度在6～32字符之间 !'),
    code: Code.ERROR_VALID_PASSWORD_FORMAT
  },
  ['email']: {
    pattern: '^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$',
    message: Message.ERROR_VALID_EMAIL_FORMAT,
    code: Code.ERROR_VALID_EMAIL_FORMAT
  },
  ['phone']: {
    pattern: '^0?(12[0-9]|13[0-9]|14[57]|15[012356789]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$',
    message: Message.ERROR_VALID_PHONE_FORMAT,
    code: Code.ERROR_VALID_PHONE_FORMAT
  },
  ['nickname']: {
    pattern: '^(?![_-])(?!.*?[_-]$)[a-zA-Z0-9-_\\u4e00-\\u9fa5]+$',
    min: 4,
    max: 12,
    message: Message.ERROR_VALID_NICKNAME_FORMAT,
    code: Code.ERROR_VALID_NICKNAME_FORMAT
  }
}