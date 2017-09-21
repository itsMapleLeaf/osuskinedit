const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const scss = require('rollup-plugin-scss')
const json = require('rollup-plugin-json')
const { resolve } = require('path')
const fs = require('fs')

const root = resolve(__dirname, '..')
const sourcePath = resolve(root, 'src')
const outputPath = resolve(root, 'build')
const htmlPath = resolve(sourcePath, 'renderer/index.html')

const typescriptPlugin = typescript()

const scssPlugin = scss({
  output: resolve(outputPath, 'styles.css'),
})

const jsonPlugin = json()

const mainConfig = {
  input: {
    input: resolve(sourcePath, 'main/app.ts'),
    plugins: [typescriptPlugin, jsonPlugin],
    external: ['electron', 'path', 'lodash', 'configstore'],
  },
  output: {
    file: resolve(outputPath, 'main.js'),
    format: 'cjs',
  },
}

const rendererConfig = {
  input: {
    input: resolve(sourcePath, 'renderer/main.tsx'),
    plugins: [typescriptPlugin, jsonPlugin, scssPlugin],
    external: ['react', 'react-dom'],
  },
  output: {
    file: resolve(outputPath, 'renderer.js'),
    format: 'cjs',
  },
}

module.exports = {
  mainConfig,
  rendererConfig,
  root,
  sourcePath,
  outputPath,
  htmlPath,
}