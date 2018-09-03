import path from 'path'
import fs from 'fs-extra'
import _ from 'lodash'
import { md5, getPath } from './index'
import { store, store_root, site_url, storeOptions } from '../config'

export const upload = (file, options,  done) => {
  let { filename } = options
  let uploadStore = store[options.type]
  let extname = uploadStore.extname || path.extname(filename)
  let newFilename = md5(new Date().getTime().toString()) + extname
  let rootDir = getPath(uploadStore.root_dir, store_root)
  !fs.existsSync(rootDir) && fs.mkdirpSync(rootDir)
  let file_dir = ''
  let file_name = newFilename
  let uploadStoreKey = storeOptions[options.type]
  if (uploadStore.filename || uploadStoreKey) {
    newFilename = filename
    let fileDir = newFilename.replace(/(.*\/)*([^.]+).*/ig, '$1')
    let fileDirPath = path.resolve(rootDir, fileDir)
    !fs.existsSync(fileDirPath) && fs.mkdirpSync(fileDirPath)
    if (!_.isEmpty(fileDir)) {
      file_dir = `?dir=${fileDir.replace(/(\/)$/, '')}`
    }
    file_name = newFilename.replace(/(.*\/)*([^.]+)/ig, '$2')
  }
  let filePath = path.resolve(rootDir, newFilename)

  file.on('end', () => 
    done(null, {
      key: newFilename,
      path: filePath,
      url: `${site_url}/uploadfile/${options.type}/${file_name}${file_dir}`
    })
  )
  file.pipe(fs.createWriteStream(filePath))
}