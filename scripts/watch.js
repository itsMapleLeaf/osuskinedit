const rollup = require('rollup')
const config = require('./config')

function watch({ input, output }) {
  const watchOptions = Object.assign({}, input, {
    output: [output],
  })

  const watcher = rollup.watch(watchOptions)

  watcher
    .on('event', event => {
      if (event.code === 'BUNDLE_START') {
        console.log(`bundling ${event.input}...`)
      }
      if (event.code === 'BUNDLE_END') {
        console.log('done')
      }
    })
    .on('error', console.error)
}

watch(config.mainConfig)
watch(config.rendererConfig)
