const fs = require('fs')
const { resolve } = require('path')
const config = require('./config')

module.exports = function copyHTML() {
  const htmlInput = fs.createReadStream(config.htmlPath)
  const htmlOutput = fs.createWriteStream(resolve(config.outputPath, 'index.html'))

  return new Promise((resolve, reject) => {
    htmlInput
      .pipe(htmlOutput)
      .on('close', resolve)
      .on('error', reject)
  })
}
