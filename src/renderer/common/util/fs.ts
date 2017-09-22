import * as fs from 'fs'
import promisify from 'pify'

export const readdir = promisify(fs.readdir)
export const readFile = promisify(fs.readFile)
export const writeFile = promisify(fs.writeFile)
