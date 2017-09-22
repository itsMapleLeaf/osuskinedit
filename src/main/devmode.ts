import * as fs from 'fs'
import { resolve } from 'path'
const devmode = process.argv.includes('--dev')

export function handleDevMode(win: Electron.BrowserWindow) {
  if (devmode) {
    console.log('devmode enabled')

    win.webContents.openDevTools()

    fs.watch(resolve(__dirname, 'renderer.js'), (event, filename) => {
      win.reload()
    })
  }
}
