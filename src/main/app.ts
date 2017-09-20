import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'

let win: Electron.BrowserWindow

app.on('ready', () => {
  win = new BrowserWindow({
    show: false,
    frame: false,

    minHeight: 500,
    minWidth: 800,
    
    backgroundColor: '#000'
  })

  win.loadURL(resolve(__dirname, '../renderer/index.html'))

  win.once('ready-to-show', () => {
    win.show()
  })

  // Remove in prod
  // win.webContents.openDevTools()
})

app.on('window-all-closed', () => {
  app.quit()
})
