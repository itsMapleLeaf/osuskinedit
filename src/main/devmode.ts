import * as fs from 'fs'
import { resolve } from 'path'
const devmode = process.argv.includes('--dev')

export function handleDevMode(win: Electron.BrowserWindow) {
  if (devmode) {
    console.log('devmode enabled')

    win.webContents.openDevTools()

    fs.watch(resolve(__dirname, 'renderer.js'), win.reload.bind(win))
    fs.watch(resolve(__dirname, '../assets'), win.reload.bind(win))
  }
}
