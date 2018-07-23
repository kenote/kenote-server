# Template - 模版

- 模版采用 `nunjucks` 模块
- 放置在项目根目录下 `views/` 中，以 `.njk` 为后缀

## 编写模版

具体语法参照 [官方文档](https://mozilla.github.io/nunjucks/templating.html)

```html
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    .....
  </body>
</html>
```

## 渲染模版

```js
export const home = (req, res, next) => {
  res.render('template', {
    title: '标题名称'
  })
}
```