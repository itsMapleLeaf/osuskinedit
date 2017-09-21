import { action, observable } from 'mobx'
import * as path from 'path'

import SkinImage from 'renderer/skin/models/SkinImage'

import * as fs from 'fs'
import parseIni from 'renderer/common/util/parseIni'
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

        this.sortFiles(fileNames, skinPath)

        resolve()
      })
    })
  }

  sortFiles(fileNames: string[], skinPath: string) {
    const filteredElements = {
      images: [] as SkinImage[],
      sounds: [] as string[],
      ini: '',
    }

    const extensionMap = {
      image: ['.jpg', '.png'],
      sound: ['.mp3', '.wav'],
      ini: ['.ini'],
    }

    fileNames.forEach(fileName => {
      const extension = path.extname(fileName)

      const isSound = extensionMap.sound.includes(extension)
      const isImage = extensionMap.image.includes(extension)
      const isInit = extensionMap.ini.includes(extension)

      if (isSound) filteredElements.sounds.push(fileName)
      if (isImage) filteredElements.images.push(new SkinImage(fileName))
      if (isInit) filteredElements.ini = fileName
    })

    this.images = filteredElements.images
    this.sounds = filteredElements.sounds

    this.parseIniData(path.resolve(skinPath, filteredElements.ini))
  }

  parseIniData(iniFilePath: string) {
    fs.readFile(iniFilePath, (error, buffer) => {
      const content = buffer.toString()
      this.ini.parseIniData(parseIni(content))
      console.log(this.ini)
    })
  }
}
