const rollup = require('rollup')
const config = require('./config')

function watch({ input, output }) {
  const watchOptions = Object.assign({}, input, {
    output: [output]
  })

  const watcher = rollup.watch(watchOptions)

  watcher.on('event', console.log)
}

watch(config.mainConfig)
watch(config.rendererConfig)
