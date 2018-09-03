
import { store } from './'

export const isMaster = level => level === 9999

export const setting = {
  ['Creator']: { 
    name: '创建者', 
    level: 9999, 
    store: { 
      upload_type: Object.keys(store)
    }
  },
  ['unauthenticatedUser']: { 
    name: '未认证用户', 
    level: 1, 
    store: { 
      upload_type: [] 
    }
  },
  ['authenticatedUser']: { 
    name: '认证用户', 
    level: 2, 
    store: { 
      upload_type: ['avatar', 'wx_qrcode'] 
    }
  },
  ['seniorAdministrator']: { 
    name: '高级管理员', 
    level: 9800, 
    store: { 
      upload_type: ['avatar', 'image', 'files', 'wx_qrcode']
    }
  },
  ['generalAdministrator']: { 
    name: '普通管理员', 
    level: 9500, 
    store: { 
      upload_type: ['avatar', 'image', 'files', 'wx_qrcode']
    }
  },
}