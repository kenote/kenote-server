import { Router } from 'express'
import { store as storeOpts } from '../config'
import * as utils from '../utils'
import * as auth from '../middlewares/auth'
import * as store from '../controller/store'
import * as account from '../controller/account'
import * as accountFilter from '../filters/control/account'

const router = Router()
const upload_type = utils.getStoreKeys(storeOpts).join('|')
const download_type = utils.getStoreKeys(storeOpts, 'local').join('|')

// Upload
router.post('/upload', auth.accessToken, store.upload)
router.post(`/upload/:type(${upload_type})`, auth.accessToken, store.upload)

router.get(`/uploadfile/:type(${download_type})/:filename`, store.download)

// Account
router.post('/account/login', auth.login, account.login)
router.post('/account/check_:type(name|email|phone)', account.check)
router.post('/account/register', accountFilter.register, auth.register, account.login)
router.get('/account/logout', account.logout)
router.post('/account/settings', auth.accessToken, accountFilter.settings, account.settings)

export default router