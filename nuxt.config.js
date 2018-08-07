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
    'element-ui/lib/theme-chalk/index.css',
    { src: '~assets/scss/main.scss', lang: 'scss' }
  ],
  srcDir: 'nuxt/',
  // Build
  build: {
    vendor: [
      //'element-ui',
      'localforage',
      'axios'
    ],
    babel: {
      plugins: [['component',
        {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        },
        'transform-async-to-generator',
        'transform-runtime'
      ]],
      comments: true
    },
  },
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
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
    base: '/',
  }
}