const path = require('path')
const fs = require('fs-extra')
const nunjucks = require('nunjucks')

const ignore = [
  'node_modules/**/*',
  '.gitgnore',
  '.git/**',
  'docs/**/*',
  'server/**/*',
  'uploadfile/**/*',
  'backpack.*',
  'deploy.*',
  'project.ini',
  'nginx.default.conf',
  'yarn*',
  'LICENSE',
  'README.md'
]

module.exports = {
  ['标示Key']: {
    name: '<标示名称>',
    sftp: {
      server: '<远端地址>',
      privateKey: '<SSH私钥>',
      workspace: __dirname,
      deployTo: '<远端工程目录>',
      patterns: ['.**/**', '**'],
      ignore
    },
    scripts: {
      init: [
        'cd <远端工程目录>',
        `echo "${getNginxConf({
          root_dir: '<远端工程目录>',
          upstream_name: '<服务名称>',
          upstream_port: '<内部端口号>',
          server_port: '<外部端口号>',
          server_name: '0.0.0.0'
        })}" > nginx.conf`,
        'ln -s -f <远端工程目录>/nginx.conf <Nginx配置文件目录>/kenote-server.conf',
        '<重启Nginx服务命令>',
        '[ ! -f <远端工程目录>/project.ini ] && cp project.default.ini project.ini',
        'yarn install',
        'yarn delete',
        'yarn start'
      ],
      start: [
        'cd <远端工程目录>',
        'yarn restart'
      ],
      nginx: [
        'cd <远端工程目录>',
        `echo "${getNginxConf({
          root_dir: '<远端工程目录>',
          upstream_name: '<服务名称>',
          upstream_port: '<内部端口号>',
          server_port: '<外部端口号>',
          server_name: '0.0.0.0'
        })}" > nginx.conf`,
        '<重启Nginx服务命令>',
      ]
    }
  }
}

function getNginxConf (opts) {
  let tplString = fs.readFileSync(path.resolve(__dirname, 'nginx.default.conf'), 'utf-8')
  return nunjucks.renderString(tplString, opts)
}