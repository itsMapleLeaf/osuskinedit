const rollup = require('rollup')
const { resolve } = require('path')
const fs = require('fs')
const config = require('./config')

async function build({ input, output }) {
  const bundle = await rollup.rollup(input)
  await bundle.write(output)
}

function copyHTML() {
  const htmlInput = fs.createReadStream(config.htmlPath)
  const htmlOutput = fs.createWriteStream(resolve(config.outputPath, 'index.html'))

  return new Promise((resolve, reject) => {
    htmlInput
      .pipe(htmlOutput)
      .on('close', resolve)
      .on('error', reject)
  })
}

const promises = [build(config.mainConfig), build(config.rendererConfig), copyHTML()]

Promise.all(promises).catch(console.error)
