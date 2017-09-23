import { action, observable } from 'mobx'
import * as path from 'path'

import { exists, readdir } from 'renderer/common/util/fs'

import SkinElement from 'renderer/skin/models/SkinElement'
import SkinImage from 'renderer/skin/models/SkinImage'
import SkinIni from 'renderer/skin/models/SkinIni'
import SkinSound from 'renderer/skin/models/SkinSound'

import { loadImage, loadSound } from 'renderer/common/util'
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
    const imageFileNames = fileNames.filter(fileName => {
      return imageExtensions.includes(path.extname(fileName))
    })

    const createImageObject = async (fileName: string) => {
      const { name, ext } = path.parse(fileName)
      const fullPath = path.resolve(this.skinPath, name)
      const normalResPath = fullPath + ext
      const doubleResPath = fullPath + '@2x' + ext
      const hasDoubleRes = await exists(doubleResPath)

      const fullPathWithExtension = hasDoubleRes
        ? doubleResPath
        : normalResPath

      const scale = hasDoubleRes ? 2 : 1

      const image = await loadImage(fullPathWithExtension)

      return new SkinImage(name, image, scale)
    }

    return Promise.all(imageFileNames.map(createImageObject))
  }

  @action
  private async loadSounds(fileNames: string[]) {
    const createSoundObject = async (fileName: string) => {
      const {name} = path.parse(fileName)
      const fullPath = path.resolve(this.skinPath, name)
      const sound = await loadSound(fullPath)
      return new SkinSound(name, sound)
    }

    const soundFileNames = fileNames
      .filter(fileName => soundExtensions.includes(path.extname(fileName)))

    return Promise.all(soundFileNames.map(createSoundObject))
  }

  private createElements() {
    const { elements } = defaultSchema

    const skinElements = elements.map((elementOptions: any) => {
      return new SkinElement(elementOptions, elementOptions.imageMap, this.images)
    })

    this.elements.push(...skinElements)
  }

  getImage(id: string) {
    return this.images.find(image => image.id === id)
  }
}
