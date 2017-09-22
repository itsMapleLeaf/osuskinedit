const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const scss = require('rollup-plugin-scss')
const json = require('rollup-plugin-json')
const nodeBuiltins = require('rollup-plugin-node-builtins')
const sourceMaps = require('rollup-plugin-sourcemaps')
const { resolve } = require('path')
const fs = require('fs')
const { dependencies } = require('../package.json')

const root = resolve(__dirname, '..')
const sourcePath = resolve(root, 'src')
const outputPath = resolve(root, 'build')
const htmlPath = resolve(sourcePath, 'renderer/index.html')

const external = Object.keys(dependencies).concat('path', 'fs', 'history/createMemoryHistory')

const scssPlugin = scss({
  output: resolve(outputPath, 'styles.css'),
})

const plugins = [
  sourceMaps(),
  typescript(),
  json(),
  // nodeBuiltins()
]

const mainConfig = {
  input: {
    input: resolve(sourcePath, 'main/app.ts'),
    plugins,
    external,
  },
  output: {
    file: resolve(outputPath, 'main.js'),
    format: 'cjs',
    sourcemap: true,
  },
}

const rendererConfig = {
  input: {
    input: resolve(sourcePath, 'renderer/main.tsx'),
    plugins: plugins.concat(scss({ output: resolve(outputPath, 'styles.css') })),
    external,
  },
  output: {
    file: resolve(outputPath, 'renderer.js'),
    format: 'cjs',
    sourcemap: true,
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
