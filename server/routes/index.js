import { Router } from 'express'
import { store as storeOpts } from '../config'
import * as auth from '../middlewares/auth'
import * as store from '../controller/store'

const router = Router()
const upload_type = Object.keys(storeOpts).join('|')

router.post('/upload', auth.accessToken, store.upload)
router.post(`/upload/:type(${upload_type})`, auth.accessToken, store.upload)

export default router