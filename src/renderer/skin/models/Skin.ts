import { action, observable } from 'mobx'
import * as path from 'path'

import { exists, readdir } from 'renderer/common/util/fs'

import SkinElement from 'renderer/skin/models/SkinElement'
import SkinImage from 'renderer/skin/models/SkinImage'
import SkinIni from 'renderer/skin/models/SkinIni'
import SkinSound from 'renderer/skin/models/SkinSound'

import defaultSchema from '../defaultSchema.json'
export { defaultSchema }

const imageExtensions = ['.png', '.jpg']
const soundExtensions = ['.ogg', '.wav', '.mp3']

export enum SkinLoadingState {
  none,
  loading,
  failed,
  finished,
}

export default class Skin {
  @observable loadStatus = SkinLoadingState.none
  @observable loadError: Error | void

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
    this.skinPath = skinPath
    this.loadStatus = SkinLoadingState.loading

    try {
      const fileNames = await readdir(skinPath)

      this.images = await this.loadImages(fileNames)
      this.sounds = await this.loadSounds(fileNames)
      await this.loadIni(fileNames)
      this.createElements()

      this.loadStatus = SkinLoadingState.finished
    } catch (error) {
      this.loadStatus = SkinLoadingState.failed
      this.loadError = error
      console.error('Error loading skin:', error)
    }
  }

  @action
  private async loadIni(fileNames: string[]) {
    const iniFileName = fileNames.find(name => name.toLowerCase() === 'skin.ini')
    if (iniFileName) {
      await this.ini.read(path.resolve(this.skinPath, iniFileName))
    } else {
      throw new Error('skin.ini file not found')
    }
  }

  @action
  private async loadImages(fileNames: string[]) {
    const images = [] as SkinImage[]

    const imageFileNames = fileNames.filter(fileName => {
      return imageExtensions.includes(path.extname(fileName))
    })

    for (const fileName of imageFileNames) {
      const { name, ext } = path.parse(fileName)
      const fullPath = path.resolve(this.skinPath, name)
      const hasDoubleRes = await exists(fullPath + '@2x' + ext)

      const fullPathWithExtension = hasDoubleRes
        ? fullPath + '@2x' + ext
        : fullPath + ext

      images.push(new SkinImage(name, fullPathWithExtension))
    }

    await Promise.all(images.map(img => img.load()))

    return images
  }

  @action
  private async loadSounds(fileNames: string[]) {
    const sounds = [] as SkinSound[]

    fileNames
      .filter(fileName => soundExtensions.includes(path.extname(fileName)))
      .forEach(fileName => {
        const {name} = path.parse(fileName)
        const fullPath = path.resolve(this.skinPath, name)
        sounds.push(new SkinSound(name, fullPath))
      })

    await Promise.all(sounds.map(img => img.load()))

    return sounds
  }

  private createElements() {
    const { elements } = defaultSchema

    const skinElements = elements.map((elementOptions: any) => {
      return new SkinElement(elementOptions, elementOptions.imageMap, this.images)
    })

    this.elements.push(...skinElements)
  }
}
