import path from 'path'
import fs from 'fs-extra'
import Busboy from 'busboy'
import bytes from 'bytes'
import { store, store_root, storeOptions } from '../config'
import { getPath, isNull } from '../utils'
import storeUtil from '../utils/store'
import { Code } from '../error'
import * as userProxy from '../proxys/user'

export const upload = (req, res, next) => {
  let auth = req.user
  let authStore = auth.group.store
  let type = (req.params.type || 'files').toLowerCase()
  let uploadStore = store[type]
  let uploadStoreKey = storeOptions[type]
  let avatarFile = (auth[uploadStoreKey] || '').replace(/\s+/g, '')
  let oldFilename = uploadStoreKey && !isNull(avatarFile) ? avatarFile : undefined
  console.log(oldFilename)
  // 检测上传权限
  if (authStore.upload_type.indexOf(type) === -1) {
    return res.api(null, Code.ERROR_UPLOAD_FLAG_NULL)
  }
  let notFiles = true
  let fileNum = 1
  let isFileLimit = false
  let busboy = new Busboy({
    headers: req.headers,
    limits: {
      fileSize: bytes(uploadStore.max_size)
    }
  })
  let fileDir = ''
  if (uploadStore.store === 'local' && req.query.dir) {
    fileDir = req.query.dir.replace(/^(\/)|(\/)$/g, '') + '/'
  }
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    notFiles = false
    if(fileNum > 1) return
    fileNum++
    // 检测上传文件类型
    if (uploadStore.mime_type.indexOf(mimetype) === -1) {
      return res.api(null, Code.ERROR_UPLOAD_FILE_MIMETYPE, [mimetype])
    }
    let fileSize = 0
    file.on('data', data => {
      fileSize += data.length
    })
    // 检测上传文件大小
    file.on('limit', () => {
      isFileLimit = true
      return res.api(null, Code.ERROR_UPLOAD_FILESIZE_LARGEMAX, [uploadStore.max_size])
    })
    let storeProxy = storeUtil(uploadStore.store, uploadStore.store_opts)
    let options = {
      filename: fileDir + (oldFilename || filename),
      type
    }
    // 写入上传文件
    storeProxy.upload(file, options, async (err, result) => {
      if (err) return next(err)
      if (isFileLimit) {
        uploadStore.store === 'local' && fs.removeSync(result.path)
        return
      }
      let uploadInfo = {
        file_name: result.key,
        file_size: fileSize,
        file_url: result.url
      }
      if (type === 'avatar') {
        let newAuth = await userProxy.updateAvatar(auth._id, uploadInfo.file_name)
        let authInfo = {
          auth: {
            ...newAuth._doc || newAuth,
            avatar: uploadInfo.file_name
          },
          token: newAuth.jwToken
        }
        req.logIn(authInfo, err => {
          if (err) { return next(err) }
        })
      }
      return res.api(uploadInfo)
    })
  })
  // 检测是否有文件上传
  busboy.on('finish', () => notFiles && res.api(null, Code.ERROR_UPLOAD_NOT_FILE) )
  req.pipe(busboy)
}

export const download = async (req, res, next) => {
  let { type, filename } = req.params
  let uploadStore = store[type]
  let rootDir = getPath(uploadStore.root_dir, store_root)
  let filePath = path.resolve(rootDir, filename)
  if (!fs.existsSync(filePath)) return res.notfound()
  res.download(filePath, uploadStore.draw)
}