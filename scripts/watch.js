const fs = require('fs')
const { resolve, dirname } = require('path')
const rollup = require('rollup')
const config = require('./config')
const childProcess = require('child_process')

async function logTime(fn) {
  const time = Date.now()
  await fn()
  console.log(`Finished in ${Date.now() - time}ms`)
}

function watch({ input, output }) {
  const watchOptions = Object.assign({}, input, {
    output: [output],
  })

  const watcher = rollup.watch(watchOptions)

  watcher
    .on('event', event => {
      switch (event.code) {
        case 'BUNDLE_START':
          console.log(`bundling ${event.input}...`)
          break

        case 'BUNDLE_END':
          console.log('done')
          break

        case 'ERROR':
        case 'FATAL':
          console.log('error', event)
          break

        case 'START':
        case 'END':
          break

        default:
          console.log(event)
      }
    })
    .on('error', console.error)
}

watch(config.mainConfig)
watch(config.rendererConfig)
console.log('Watching files...')
