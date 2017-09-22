import { action, observable } from 'mobx'
import * as path from 'path'

import { readdir } from 'renderer/common/util/fs'
import SkinImage from 'renderer/skin/models/SkinImage'
import SkinIni from 'renderer/skin/models/SkinIni'

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

  skinPath = ''
  @observable images = [] as SkinImage[]
  @observable sounds = [] as string[]
  @observable ini = new SkinIni()

  /**
   * Loads the skin using the path provided
   */
  @action
  async load(skinPath: string) {
    try {
      this.loadStatus = SkinLoadingState.loading
      this.skinPath = skinPath

      const fileNames = await readdir(skinPath)
      this.parseFiles(fileNames)
    } catch (error) {
      this.loadStatus = SkinLoadingState.failed
      this.loadError = error
    }
  }

  parseFiles(fileNames: string[]) {
    const extensions = {
      image: ['.jpg', '.png'],
      sound: ['.mp3', '.wav'],
    }

    const filterExtensions = (ext: string[]) => {
      return (x: string) => {
        return ext.includes(path.extname(x))
      }
    }

    this.images = fileNames
      .filter(filterExtensions(extensions.image))
      .map(x => new SkinImage(path.resolve(this.skinPath, x)))

    this.sounds = fileNames.filter(filterExtensions(extensions.sound)).map(x => x)

    this.ini.read(path.resolve(this.skinPath, 'skin.ini'))
  }
}
