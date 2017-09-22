import { app, BrowserWindow } from 'electron'
import * as fs from 'fs'
import { resolve } from 'path'
import { restoreWindowState, storeWindowState } from './windowState'

let win: Electron.BrowserWindow

const devmode = process.argv.includes('--dev')

app.on('ready', () => {
  win = new BrowserWindow({
    minHeight: 500,
    minWidth: 800,

    backgroundColor: '#000',

    show: false,
    frame: false,
  })

  restoreWindowState(win)

  win.loadURL(resolve(__dirname, 'index.html'))

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('move', () => storeWindowState(win))
  win.on('resize', () => storeWindowState(win))

  if (devmode) {
    win.webContents.openDevTools()

    fs.watch(resolve(__dirname, 'renderer.js'), (event, filename) => {
      win.reload()
    })
  }
})

app.on('window-all-closed', () => {
  app.quit()
})
