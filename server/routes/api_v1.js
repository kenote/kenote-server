import { Router } from 'express'
import * as auth from '../middlewares/auth'
import * as signAPI from '../api/v1/sign'

const router = Router()

router.post('/login', auth.login, signAPI.login)
router.get('/accesstoken', auth.accessToken, signAPI.accesstoken)

export default router