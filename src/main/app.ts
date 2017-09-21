import * as ConfigStore from 'configstore'
import { app, BrowserWindow } from 'electron'
import { debounce } from 'lodash'
import { resolve } from 'path'

const meta = require('../../package.json')
const store = new ConfigStore(meta.name, {})

let win: Electron.BrowserWindow

const storeWindowState = debounce(() => {
  const isMaximized = win.isMaximized()
  if (isMaximized) {
    store.set('window.isMaximized', isMaximized)
  } else {
    const [x, y] = win.getPosition()
    const [width, height] = win.getSize()
    store.set('window', { x, y, isMaximized, width, height })
  }
}, 500)

app.on('ready', () => {
  const { x, y, width, height, isMaximized } = store.get('window')

  win = new BrowserWindow({
    minHeight: 500,
    minWidth: 800,

    x,
    y,
    width,
    height,

    backgroundColor: '#000',

    show: false,
    frame: false,
  })

  if (isMaximized) {
    win.maximize()
  }

  win.loadURL(resolve(__dirname, 'index.html'))

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('move', storeWindowState)
  win.on('resize', storeWindowState)

  // Remove in prod
  win.webContents.openDevTools()
})

app.on('window-all-closed', () => {
  app.quit()
})
