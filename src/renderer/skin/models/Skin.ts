import { action, observable } from 'mobx'
import * as path from 'path'

import { readdir } from 'renderer/common/util/fs'

import SkinElement from 'renderer/skin/models/SkinElement'
import SkinImage from 'renderer/skin/models/SkinImage'
import SkinIni from 'renderer/skin/models/SkinIni'
import SkinSound from 'renderer/skin/models/SkinSound'

import defaultSchema from '../defaultSchema.json'
export { defaultSchema }

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

  @observable elements = [] as SkinElement[]
  @observable images = [] as SkinImage[]
  @observable sounds = [] as SkinSound[]

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
      this.createElements()
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

    const createSkinClass = (x: string, skinClass: any) => {
      const extension = path.extname(x)
      const basename = path.basename(x, extension)
      const fullPath = path.resolve(this.skinPath, x)

      return new skinClass(basename, fullPath)
    }

    this.images = fileNames
      .filter(filterExtensions(extensions.image))
      .map(x => createSkinClass(x, SkinImage))

    this.sounds = fileNames
      .filter(filterExtensions(extensions.sound))
      .map(x => createSkinClass(x, SkinSound))

    this.ini.read(path.resolve(this.skinPath, 'skin.ini'))
  }

  createElements() {
    const { elements } = defaultSchema

    const skinElements = elements.map((elementOptions: any) => {
      return new SkinElement(
        elementOptions,
        elementOptions.imageMap,
        this.images,
      )
    })

    this.elements.push(...skinElements)

    console.log(this)
  }
}
