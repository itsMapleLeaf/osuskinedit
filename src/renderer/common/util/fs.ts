import * as fs from 'fs'
import promisify from 'pify'

export const readdir = promisify(fs.readdir)
export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)
export const access = promisify(fs.access)

export async function exists(path: string) {
  try {
    await access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}
