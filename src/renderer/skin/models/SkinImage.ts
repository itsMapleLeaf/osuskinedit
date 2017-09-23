import { resizeImage } from '../../canvas/util/index'

export default class SkinImage {
  scaledImage: HTMLCanvasElement

  constructor(public id: string, public image: HTMLImageElement, public resolution: number) {
    this.scaledImage = resizeImage(image, image.width / resolution, image.height / resolution)
  }
}
