/**
 * Deploy -- 服务器部署
 */
const _ = require('lodash')
const client = require('kenote-deploy-kit')
const util = require('kenote-deploy-kit/lib/util')
const Deploy = require('./deploy.config')

const { target, argv } = _.zipObject([,,'target', 'argv'], process.argv)
const Options = Deploy[target]

if (!Options) {
  console.log(`No configuration found.`)
  process.exit(0)
}
console.log(`Concent to the Server ==> ${Options.name}`)
if (argv === '--nginx' && _.has(Options, 'scripts.nginx')) {
  client.ssh(Options.sftp).exec(Options.scripts.nginx.join(' && '))
}
else {
  client.sftp(Options.sftp).exec(null, err => {
    console.log(`Finished Upload Files!`)
    switch (argv) {
      case '--init': 
        if (_.has(Options, 'scripts.init')) {
          client.ssh(Options.sftp).exec(Options.scripts.init.join(' && '))
        }
        break
      default:
        if (_.has(Options, 'scripts.start')) {
          client.ssh(Options.sftp).exec(Options.scripts.start.join(' && '))
        }
        break
    }
  })
}
