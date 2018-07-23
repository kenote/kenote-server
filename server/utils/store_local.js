import path from 'path'
import fs from 'fs-extra'
import _ from 'lodash'
import { md5, getPath } from './index'
import { store, store_root, site_url } from '../config'

export const upload = (file, options,  done) => {
  let { filename } = options
  let newFilename = md5(new Date().getTime().toString()) + path.extname(filename)
  let uploadStore = store[options.type]
  let rootDir = getPath(uploadStore.root_dir, store_root)
  !fs.existsSync(rootDir) && fs.mkdirpSync(rootDir)
  let file_dir = ''
  let file_name = newFilename
  if (uploadStore.filename) {
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