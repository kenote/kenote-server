# Deploy - 部署

- `ecosystem.config.js` PM2 配置文件
- `nginx.default.conf` Nginx 配置模型

## 配置

拷贝 `deploy.default.config.js` 到 `deploy.config.js`
```bash
cp deploy.default.config.js deploy.config.js
```

编辑 `deploy.config.js`
```js
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
  // 服务器标志
  ['aliyun']: {
    // 显示名称
    name: '阿里云服务器',
    // 远程连接配置
    sftp: {
      // 服务器地址；密码连接：root:password@192.168.1.214:22
      server: 'root@192.168.1.214:22',
      // 如果是私钥连接 /Users/thondery/workspace
      privateKey: '/Users/myhome/.ssh/aliyun',
      // 本地工作目录；无需修改
      workspace: __dirname,
      // 远程服务器部署路径
      deployTo: '/mnt/nodejs/kenote-server',
      // 
      patterns: ['.**/**', '**'],
      // 要过滤的文件/文件夹
      ignore
    },
    // 上传后的执行脚本
    scripts: {
      // 初始化脚本
      init: [
        'cd /mnt/nodejs/kenote-server',
        `echo "${getNginxConf({
          root_dir: '/mnt/nodejs/kenote-server',
          upstream_name: 'kenote-server',
          upstream_port: '4000',
          server_port: '7000',
          server_name: '0.0.0.0'
        })}" > nginx.conf`,
        'ln -s -f /mnt/nodejs/kenote-server/nginx.conf /etc/nginx/conf.d/kenote-server.conf',
        'systemctl restart nginx.service',
        'systemctl status nginx.service',
        '[ ! -f /mnt/nodejs/kenote-server/project.ini ] && cp project.default.ini project.ini',
        'yarn install',
        'yarn delete',
        'yarn start'
      ],
      // 更新代码重启服务脚本
      start: [
        'cd /mnt/nodejs/kenote-server',
        'yarn restart'
      ],
      // 更新Nginx配置
      nginx: [
        'cd /mnt/nodejs/kenote-server',
        `echo "${getNginxConf({
          root_dir: '/mnt/nodejs/kenote-server',
          upstream_name: 'kenote-server',
          upstream_port: 4001,
          server_port: 7001,
          server_name: '0.0.0.0'
        })}" > nginx.conf`,
        'systemctl restart nginx.service',
        'systemctl status nginx.service',
      ]
    }
  }
}

function getNginxConf (opts) {
  let tplString = fs.readFileSync(path.resolve(__dirname, 'nginx.default.conf'), 'utf-8')
  return nunjucks.renderString(tplString, opts)
}
```

## 执行部署

部署到服务器
```bash
# 编译代码
yarn build
# 第一次部署到服务器
yarn deploy <服务器标志> --init
# 以后 ...
yarn deploy <服务器标志>
# 更新Nginx配置
yarn deploy <服务器标志> --nginx
```

连接到服务器，执行
```bash
# 编辑工程配置
vi /mnt/nodejs/kenote-server/project.ini

; Configure Production

HOST = 0.0.0.0
PORT = 4000

site_name = Kenote
site_url = http://0.0.0.0:4000
session_secret = kenote_secret
store_root = uploadfile

; JWT
[jwt_sign]

; 设置 MongoDB
[mongo]
uri = mongodb://localhost:27017/kenote_server

; 设置 Redis
[redis]
host = 127.0.0.1
port = 6379
db = 0

; 设置 Mailer
[mailer]
host = smtp.mxhichina.com
port = 25

[mailer.auth]
user = user@mxhichina.com
pass = password

; 设置文件上传
[store.files]
store = local
root_dir = @files
max_size = 50MB
mime_type[] = image/png
mime_type[] = image/gif
mime_type[] = image/jpeg
mime_type[] = image/svg
mime_type[] = image/svg+xml
mime_type[] = application/json
mime_type[] = application/octet-stream
mime_type[] = text/markdown
mime_type[] = application/zip

; 设置七牛CND资源
[store.cdn]
store = qn
mime_type[] = image/png
mime_type[] = image/gif
mime_type[] = image/svg
max_size = 8MB

[store.cdn.store_opts]
bucket = cdn-name
origin = http://cdn.youdomain.com
uploadURL = http://up-z0.qiniu.com
accessKey = your_accessKey
secretKey = your_secretKey

; 定义 MIME-TYPES 类型，用于显示和下载
[mimeTypes]
display[] = image/png
display[] = image/gif
display[] = image/jpeg
display[] = image/svg
display[] = image/svg+xml
```

重启服务
```bash
pm2 restart kenote-server
```