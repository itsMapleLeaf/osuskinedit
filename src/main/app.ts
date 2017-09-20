import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'

let win: Electron.BrowserWindow

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL(resolve(__dirname, '../renderer/index.html'))
})

app.on('window-all-closed', () => {
  app.quit()
})
