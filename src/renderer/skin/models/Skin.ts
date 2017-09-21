import { action, observable } from 'mobx'
import * as path from 'path'

import SkinImage from 'renderer/skin/models/SkinImage'

import * as fs from 'fs'
import SkinIni from './SkinIni';

export enum SkinLoadingState {
  none,
  loading,
  failed,
  finished,
}

export default class Skin {
  @observable loadStatus = SkinLoadingState.none
  @observable loadError = null

  @observable name = 'Unnamed skin'
  @observable description = ''

  @observable images = [] as SkinImage[]
  @observable sounds = [] as string[]
  @observable ini = new SkinIni()

  /**
   * Loads the skin using the path provided
   */
  @action
  load(skinPath: string) {
    return new Promise((resolve, reject) => {
      this.loadStatus = SkinLoadingState.loading

      const handleError = (error: any) => {
        this.loadStatus = SkinLoadingState.failed
        this.loadError = error

        reject(error)
      }

      fs.readdir(skinPath, (error, fileNames) => {
        if (error) handleError(error)

        this.parseFiles(fileNames, skinPath)

        resolve()
      })
    })
  }

  parseFiles(fileNames: string[], skinPath: string) {
    const extensions = {
      image: ['.jpg', '.png'],
      sound: ['.mp3', '.wav'],
    }

    const filterExtensions = (ext: string[]) => {
      return (x:string) => {
        return ext.includes(path.extname(x))
      }
    }

    this.images = fileNames
      .filter(filterExtensions(extensions.image))
      .map(x => new SkinImage(path.resolve(skinPath, x)))

    this.sounds = fileNames
      .filter(filterExtensions(extensions.sound))
      .map(x => x)

    this.ini.read(path.resolve(skinPath, 'skin.ini'))

    console.log(this)
  }
}
