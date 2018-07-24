import { Router } from 'express'
import { store as storeOpts } from '../config'
import * as utils from '../utils'
import * as auth from '../middlewares/auth'
import * as store from '../controller/store'

const router = Router()
const upload_type = utils.getStoreKeys(storeOpts).join('|')
const download_type = utils.getStoreKeys(storeOpts, 'local').join('|')

router.post('/upload', auth.accessToken, store.upload)
router.post(`/upload/:type(${upload_type})`, auth.accessToken, store.upload)

router.get(`/uploadfile/:type(${download_type})/:filename`, store.download)

export default router