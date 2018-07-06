module.exports = {
  webpack: (config, options, webpack) => ({
    ...config,
    entry: {
      main: './server/index.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'CONFIG_FILE': JSON.stringify('project.ini'),
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  })
}