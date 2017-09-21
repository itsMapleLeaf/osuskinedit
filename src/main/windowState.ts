import { debounce } from 'lodash'
import store from './configStore'

function _storeWindowState(win: Electron.BrowserWindow) {
  const isMaximized = win.isMaximized()
  if (isMaximized) {
    store.set('window.isMaximized', isMaximized)
  } else {
    const [x, y] = win.getPosition()
    const [width, height] = win.getSize()
    store.set('window', { x, y, isMaximized, width, height })
  }
}

export const storeWindowState = debounce(_storeWindowState)

export function restoreWindowState(win: Electron.BrowserWindow) {
  const { x, y, width, height, isMaximized } = store.get('window')

  win.setPosition(x, y)
  win.setSize(width, height)
  if (isMaximized) win.maximize()
}
