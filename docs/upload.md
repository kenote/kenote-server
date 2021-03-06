# Upload - 文件上传

- 上传采用 `busboy` 模块
- 七牛CND采用 `qn` 模块

## 配置

```ini
; 设置本地上传跟路径
store_root = uploadfile

; 设置一个名为 <files> 的上传配置
[store.files]
; 上传类型；local<本地> | qn<七牛CDN>
store = local
; 上传路径；@开头表示 <store_root>
root_dir = @files
; 文件大小限制
max_size = 50MB
; 支持的文件类型
mime_type[] = image/png
mime_type[] = image/gif
mime_type[] = image/jpeg
mime_type[] = image/svg
mime_type[] = image/svg+xml
mime_type[] = application/json
mime_type[] = application/octet-stream
mime_type[] = text/markdown
mime_type[] = application/zip
; 是否加水印
draw = true

; 七牛CDN相关配置
[store.files.store_opts]
bucket = cdn-name
origin = http://cdn.youdomain.com
uploadURL = http://up-z0.qiniu.com
accessKey = your_accessKey
secretKey = your_secretKey

; 设置图片水印
[drawText]
color = '#ffffff'
font = 'Comic Sans MS'
size = 14
text = @Kenote
gravity = SouthEast
```

## 上传文件

```js
import request from 'superagent'

const domain = 'http://localhost:4000'
const store_key = 'files'
request
  .post(`${domain}/upload/${store_key}`)
  .set('Authorization', 'Bearer .....')  // JWT 认证
  .attach(file.name, file)
  .on('progress', e => { // 跟踪上传进度...
    let percent = ~~e.percent
    console.log('percent:', percent)
  })
  .end((err, res) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(res)
    }
  })
/**
 * {
 *   file_name: '83ea7ebb55e8b75952e09ee0393169bb.png',
 *   file_size: 113513,
 *   file_url: 'http://0.0.0.0:4000/uploadfile/image/83ea7ebb55e8b75952e09ee0393169bb.png'
 * }
```

## 下载文件

配置显示文件类型
```ini
; 定义 MIME-TYPES 类型，用于显示和下载
[mimeTypes]
display[] = image/png
display[] = image/gif
display[] = image/jpeg
display[] = image/svg
display[] = image/svg+xml
```

操作演示
```bash
# 显示，非 `display` 类型均为下载
http://0.0.0.0:4000/uploadfile/image/83ea7ebb55e8b75952e09ee0393169bb.png

# 显示缩略图
http://0.0.0.0:4000/uploadfile/image/83ea7ebb55e8b75952e09ee0393169bb.png?show=120|120

# 下载
http://0.0.0.0:4000/uploadfile/image/83ea7ebb55e8b75952e09ee0393169bb.png?down
```