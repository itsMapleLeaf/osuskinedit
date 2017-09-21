import { observable, action } from 'mobx'
import * as path from 'path'

import SkinImage from 'renderer/skin/models/SkinImage'

import * as fs from 'fs'

enum SkinLoadingStates {
  none,
  loading,
  failed,
  finished,
}

export default class Skin {
  @observable loadStatus = SkinLoadingStates.none
  @observable loadError = null

  @observable name = 'Unnamed skin'
  @observable description = ''

  @observable images = [] as SkinImage[]
  @observable sounds = [] as string[]
  @observable ini = ''

  constructor(public path: string) {}

  /**
   * Loads the skin using the path provided
   */
  @action
  load() {
    return new Promise((resolve, reject) => {
      this.loadStatus = SkinLoadingStates.loading

      const handleError = (error: any) => {
        this.loadStatus = SkinLoadingStates.failed
        this.loadError = error

        reject(error)
      }

      fs.readdir(this.path, (error, fileNames) => {
        if (error) handleError(error)

        const filteredElements = {
          images: [] as SkinImage[],
          sounds: [] as string[],
          ini: '',
        }

        const extensionMap = {
          'image': ['.jpg', '.png'],
          'sound': ['.mp3', '.wav'],
          'ini': ['.ini']
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
        this.ini = filteredElements.ini

        resolve()

        console.log(this)
      })
    })
  }
}

