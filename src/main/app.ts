import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'
import { handleDevMode } from './devmode'
import { restoreWindowState, storeWindowState } from './windowState'

let win: Electron.BrowserWindow

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

  handleDevMode(win)
})

app.on('window-all-closed', () => {
  app.quit()
})
