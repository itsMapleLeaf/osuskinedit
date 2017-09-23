import { resizeImage } from '../../canvas/util/index'

export default class SkinImage {
  image: HTMLCanvasElement

  constructor(public id: string, public rawImage: HTMLImageElement, public resolution: number) {
    this.image = resizeImage(rawImage, rawImage.width / resolution, rawImage.height / resolution)
  }
}
