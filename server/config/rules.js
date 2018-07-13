import util from 'util'
import { 
  ERROR_VALID_USERNAME_FORMAT,
  ERROR_VALID_PASSWORD_FORMAT,
  ERROR_VALID_EMAIL_FORMAT
} from '../error/message'

export default {
  ['username']: {
    pattern: '^[a-zA-Z]{1}[a-zA-Z0-9_]{3,11}$',
    message: util.format(ERROR_VALID_USERNAME_FORMAT, '%s', '因由英语字母、数字和下划线组成，且必须英语字母开头，长度在4～12字符之间 !')
  },
  ['password']: {
    pattern: '^(?=.*[A-Za-z])[A-Za-z0-9$@$!%*#?&]{6,32}$',
    message: util.format(ERROR_VALID_PASSWORD_FORMAT, '%s', '因由英语字母、数字和特殊字符[$@$!%*#?&]组成，且至少一个英语字母，长度在6～32字符之间 !')
  },
  ['email']: {
    pattern: '^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$',
    message: ERROR_VALID_EMAIL_FORMAT
  }
}