import { action, observable } from 'mobx'
import * as path from 'path'

import { exists, readdir } from 'renderer/common/util/fs'

import SkinElement from 'renderer/skin/models/SkinElement'
import SkinImage from 'renderer/skin/models/SkinImage'
import SkinIni from 'renderer/skin/models/SkinIni'
import SkinSound from 'renderer/skin/models/SkinSound'

import defaultSchema from '../defaultSchema.json'
export { defaultSchema }

interface SkinClassConstructor<T> {
  new (id: string, fullpath: string): T
}

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
    try {
      this.loadStatus = SkinLoadingState.loading
      this.skinPath = skinPath

      const fileNames = await readdir(skinPath)

      await this.parseFiles(fileNames)
      this.createElements()

      this.loadStatus = SkinLoadingState.finished
    } catch (error) {
      this.loadStatus = SkinLoadingState.failed
      this.loadError = error
      console.error('Error loading skin:', error)
    }
  }

  async parseFiles(fileNames: string[]) {
    const extensions = {
      image: ['.jpg', '.png'],
      sound: ['.mp3', '.wav'],
    }

    const filterExtensions = (ext: string[]) => {
      return (x: string) => {
        return ext.includes(path.extname(x))
      }
    }

    const createSkinClass = async <T>(filename: string, skinClass: SkinClassConstructor<T>): Promise<T> => {
      const { name, ext } = path.parse(filename)
      const fullPath = path.resolve(this.skinPath, name)

      const fullPathWithExtension = (await exists(fullPath + '@2x' + ext))
        ? fullPath + '@2x' + ext
        : fullPath + ext

      return new skinClass(name, fullPathWithExtension)
    }

    this.images = await Promise.all(
      fileNames
        .filter(filterExtensions(extensions.image))
        .map(filename => createSkinClass(filename, SkinImage)),
    )

    this.sounds = await Promise.all(
      fileNames
        .filter(filterExtensions(extensions.sound))
        .map(filename => createSkinClass(filename, SkinSound)),
    )

    await Promise.all(this.images.map(image => image.load()))
    await Promise.all(this.sounds.map(sound => sound.load()))

    this.ini.read(path.resolve(this.skinPath, 'skin.ini'))
  }

  createElements() {
    const { elements } = defaultSchema

    const skinElements = elements.map((elementOptions: any) => {
      return new SkinElement(elementOptions, elementOptions.imageMap, this.images)
    })

    this.elements.push(...skinElements)
  }
}
