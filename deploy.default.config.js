const path = require('path')
const fs = require('fs-extra')

const defaultSftp = {
  workspace: __dirname,
  patterns: ['.**/**', '**'],
  ignore: [
    'node-modules/**/*',
    '.gitgnore',
    '.git/**',
    'uploadfile/**/*',
    'backpack.*',
    'deploy.*',
    'project.*',
    'yarn*',
    'LICENSE',
    'README.md'
  ]
}

module.exports = {
  aliyun: {
    name: '<标示名称>',
    sftp: {
      ...defaultSftp,
      server: '<远端地址>',
      privaKey: '<SSH私钥>',
      deployTo: '<远端工程目录>'
    }
  }
}