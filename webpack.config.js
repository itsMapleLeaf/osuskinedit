const { resolve } = require('path')
const merge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')

const typescriptLoader = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  include: [resolve(__dirname, 'src')],
}

const cssLoader = {
  test: /\.css$/,
  loader: 'style-loader!css-loader',
}

const sassLoader = {
  test: /\.s(c|a)ss$/,
  loader: 'style-loader!css-loader!sass-loader',
}

const baseConfig = {
  module: {
    rules: [typescriptLoader],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      main: resolve(__dirname, './src/main'),
      renderer: resolve(__dirname, './src/renderer'),
    },
  },
  node: false,
  externals: {
    'react': `require('react')`,
    'react-dom': `require('react-dom')`,
  },
}

const mainConfig = merge(baseConfig, {
  entry: './src/main/app',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  target: 'electron-main',
})

const rendererConfig = merge(baseConfig, {
  entry: './src/renderer/main',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'renderer.js',
  },
  module: {
    rules: [cssLoader, sassLoader],
  },
  plugins: [new HtmlPlugin({ template: './src/renderer/index.html' })],
  target: 'electron-renderer',
})

module.exports = [mainConfig, rendererConfig]
