import { observable } from 'mobx'
import SkinImage from 'renderer/skin/models/SkinImage'

class ImageMap {
  image: SkinImage
  x: number
  y: number

  constructor(options: any) {
    Object.assign(this, options)
  }
}

export default class SkinElement {
  @observable name: string

  images = [] as ImageMap[]

  constructor(
    public id: string,
    name: string,
    map: any[],
    images: SkinImage[]
  ) {
    this.name = name

    this.images = map.map(options => {
      const filename = options.filename
      const image = images.find(img => img.id == filename)

      return new ImageMap({
        image,
        x: options.x,
        y: options.y
      })
    })
  }

  render(context: CanvasRenderingContext2D) {
    alert('Not implemented!!!!')
  }
}
