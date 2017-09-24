import SkinImage from 'renderer/skin/models/SkinImage'

import { Scene } from 'renderer/canvas'
import { Bitmap } from 'renderer/canvas/drawables'
import { ColorizeFilter } from 'renderer/canvas/filters'

import Color from 'color'

interface ImageMapOptions {
  x: number
  y: number
  width?: number
  height?: number
  align?: string
}

class ImageMap {
  skinImage: SkinImage | void
  filename: string

  x: number
  y: number

  width?: number
  height?: number

  colored: boolean
  align: string

  constructor(options: ImageMapOptions) {
    Object.assign(this, options)
  }
}

interface SkinElementOptions {
  id: string
  name: string
  width: number
  height: number
}

export default class SkinElement {
  scene: Scene | void

  maps = [] as ImageMap[]

  constructor(public options: SkinElementOptions, imageMap: any, images: SkinImage[]) {
    this.registerImages(imageMap, images)
  }

  registerImages(imageMap: any, images: SkinImage[]) {
    this.maps = imageMap.map((options: any) => {
      const filename = options.filename
      const skinImage = images.find(img => img.id === filename)

      return Object.assign({ skinImage }, options)
    })
  }

  get validMaps() {
    return this.maps.filter(map => map.skinImage !== undefined)
  }

  prepareScene(context: CanvasRenderingContext2D) {
    this.scene = new Scene()

    this.validMaps.forEach(map => {
      const image = map.skinImage!.image

      const bitmap = new Bitmap({
        image: image,
        align: [0.5, 0.5],
      })

      if (map.colored) {
        const colorizeFilter = new ColorizeFilter({
          color: Color('rgb(255, 85, 171)'),
        })

        bitmap.addFilter(colorizeFilter)
      }

      this.scene!.addDrawable(bitmap)
    })
  }

  render(context: CanvasRenderingContext2D) {
    if (this.scene === undefined) this.prepareScene(context)
    this.scene!.render(context)
  }

  resizeCanvasToImages(canvas: HTMLCanvasElement) {
    const maxWidth = Math.max(...this.validMaps.map(m => m.skinImage!.image.width || 0))
    const maxHeight = Math.max(...this.validMaps.map(m => m.skinImage!.image.height || 0))
    canvas.width = maxWidth
    canvas.height = maxHeight
  }
}
