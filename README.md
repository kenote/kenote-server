# kenote-server
server for Kenote

## Engines

- `node` >= 8.11.0

## Features

- [x] Express
- [x] Json Web Tokens
- [x] GraphicsMagick
- [x] MongoDB
- [x] Nuxt

## Docs

- [x] [Mailer](./docs/mailer.md)
- [x] [Template](./docs/template.md)
- [x] [Upload](./docs/upload.md)
- [x] [Deploy](./docs/deploy.md)

## Project Structure

| 文件名 | 类型 | 说明 |
|---|---|---|
| build | 目录 | 源码编译输出目录 |
| docs | 目录 | 存放 `Markdown` 文档目录 |
| mails | 目录 | 存放邮件模版目录，支持 `html`、`mjml` 格式 |
| nuxt | 目录 | `Nuxt` 源码目录 |
| server | 目录 | 服务端 `ES6` 源码目录 |
| uploadfile | 目录 | 上传文件根目录 |
| views | 目录 | 存放 `HTML` 模版目录 |
| .babelrc | 文件 | `Babel` 配置文件 |
| backpack.config.js | 文件 | 源码编译配置文件 |
| deploy.config.js | 文件 | 工程部署配置文件 |
| deploy.js | 文件 | 工程部署执行文件 |
| ecosystem.config | 文件 | PM2配置文件 |
| nginx.default.conf | 文件 | Nginx配置模型 |
| package.json | 文件 | 项目配置文件 |
| project.ini | 文件 | 服务端工程配置文件 |

## License

this repo is released under the [MIT License](https://github.com/kenote/kenote-server/blob/master/LICENSE).