// Nuxt Configure
module.exports = {
  //
  head: {
    title: 'Website for Kenote',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Website for Kenote' },
    ]
  },
  // Global CSS
  css: [
    'iview/dist/styles/iview.css',
    { src: '~assets/scss/main.scss', lang: 'scss' }
  ],
  srcDir: 'nuxt/',
  // Build
  build: {
    vendor: [
      'iview'
    ],
    babel: {
      plugins: [['import',
        {
          libraryName: 'iview',
          libraryDirectory: 'src/components'
        },
        'transform-async-to-generator',
        'transform-runtime'
      ]],
      comments: true
    },
  },
  plugins: [
    '~plugins/iview'
  ],
  // 页面顶部loading效果  #04acf7
  loading: {
    color: '#04acf7',
    height: '3px',
    failedColor: 'red'
  },
  // 页面的过渡效果
  transition: {
    name: 'page'
  },
  // Router
  router: {
    base: '/'
  }
}