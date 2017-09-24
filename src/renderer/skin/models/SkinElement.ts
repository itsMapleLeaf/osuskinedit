import SkinImage from 'renderer/skin/models/SkinImage'

import { Scene } from 'renderer/canvas'
import { Bitmap, DrawableAlignment } from 'renderer/canvas/drawables'
import { ColorizeFilter } from 'renderer/canvas/filters'

import Color from 'color'

class ImageMap {
  skinImage: SkinImage | void
  filename: string

  x: number
  y: number

  width?: number
  height?: number

  colored: boolean
  align: string

  constructor(options: any) {
    const { x, y, color, align, filename } = options

    Object.assign(this, {
      x,
      y,
      color,
      align,
      filename,
    })
  }
}

interface SkinElementOptions {
  id: string
  name: string
  width: number
  height: number
}

export default class SkinElement {
  scene: Scene

  isPrepared = false

  maps = [] as ImageMap[]

  constructor(public options: SkinElementOptions, imageMap: any, images: SkinImage[]) {
    this.registerImages(imageMap, images)
  }

  registerImages(imageMap: any, images: SkinImage[]) {
    this.maps = imageMap.map((options: any) => {
      const filename = options.filename
      const skinImage = images.find(img => img.id === filename)

      return Object.assign(
        {
          skinImage,
        },
        options,
      )
    })
  }

  prepareScene() {
    this.scene = new Scene()

    const validMaps = this.maps.filter(map => map.skinImage !== undefined)

    const drawables = validMaps.map(map => {
      const image = map.skinImage!.image

      const bitmap = new Bitmap({
        image: image,
        align: DrawableAlignment.center,
      })

      if (map.colored) {
        const colorizeFilter = new ColorizeFilter({
          color: Color('rgb(255, 85, 171)'),
        })

        bitmap.addFilter(colorizeFilter)
      }

      return bitmap
    })

    drawables.forEach(drawable => this.scene.addDrawable(drawable))

    this.isPrepared = true
  }

  render(context: CanvasRenderingContext2D) {
    if (!this.isPrepared) this.prepareScene()

    this.scene.setContext(context)
    this.scene.render()
  }
}
