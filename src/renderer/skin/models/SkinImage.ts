import { observable } from 'mobx'

export default class SkinImage {
  @observable imagePath = ''

  constructor(imagePath: string) {
    this.imagePath = imagePath
  }
}
