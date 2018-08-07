import { Router } from 'express'
import { store as storeOpts } from '../config'
import * as utils from '../utils'
import * as auth from '../middlewares/auth'
import * as store from '../controller/store'
import * as account from '../controller/account'

const router = Router()
const upload_type = utils.getStoreKeys(storeOpts).join('|')
const download_type = utils.getStoreKeys(storeOpts, 'local').join('|')

// Upload
router.post('/upload', auth.accessToken, store.upload)
router.post(`/upload/:type(${upload_type})`, auth.accessToken, store.upload)

router.get(`/uploadfile/:type(${download_type})/:filename`, store.download)

// Account
router.post('/account/login', auth.login, account.login)
router.get('/account/logout', account.logout)

export default router