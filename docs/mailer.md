# mailer - 关于邮件

- 采用 `nodemailer` 模块发送邮件
- `HTML` 模版支持 `mjml` 模块编写，放置在项目根目录下 `mails/` 中

## 配置

编辑 `project.ini` 文件
```ini
; 设置 Mailer
[mailer]
host = smtp.mxhichina.com
port = 25

[mailer.auth]
user = user@mxhichina.com
pass = password
```

## 发送邮件

```js
import path from 'path'
import * as mailer from './utils/mailer'

mailer.asyncSend({
  /**
   * 发件人，不填为系统发送
   * 格式 -- 发件人 <收件人邮箱地址>
   **/
  from: `system <user@mxhichina.com>`,
  /**
   * 收件人
   * 格式 -- 收件人 <收件人邮箱地址>
   * 多个收件人用逗号分割
   **/
  to: `thondery <thondery@163.com>`,
  /**
   * 邮件标题
   **/
  subject: `邮件测试！！！`,
  /**
   * 正文，文本形式
   **/ 
  text: '邮件测试！！！',
  /**
   * 正文，HTML形式
   **/ 
  html: '<p>邮件测试！！！</p>',
  /**
   * 附件
   **/
  attachments: [
    {
      cid: '00000001',
      filename: 'README.md',
      path: path.resolve(process.cwd(), 'README.md')
    },
    {
      cid: '00000002',
      filename: 'README.md',
      content: '附件内容。。。'
    }
  ]
})
```

## 编写 `mjml` 模版

模版文件后缀名为 `.mjml`，具体语法参照 [mjml官方文档](https://mjml.io/documentation)

```html
<mjml>
  <mj-head>
    <mj-title>{{ title }}</mj-title>
    <mj-attributes>
      <mj-all font-size="16px" color="#797878" />
      <mj-class name="title" font-size="20px" color="#4e9c74" font-weight="bold" />
    <mj-attributes>
  </mj-head>
  <mj-body background-color="#ffffff">
    <mj-section>
      <mj-column>
        <mj-text mj-class="title">{{ title }}</mj-text>
        <mj-text>正文内容...</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

## 读取模版

```js
import * as mailer from './utils/mailer'

const htmlString = mailer.renderString('template.mjml', {
  title: '标题名称'
})
```

## 发送模版邮件

```js
import * as mailer from './utils/mailer'

mailer.sendMail('template.mjml', 
  {
    to: `thondery <thondery@163.com>`,
    subject: `邮件测试！！！`,
  },
  {
    title: '标题名称'
  }
)
```