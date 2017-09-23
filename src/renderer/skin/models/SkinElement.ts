import SkinImage from 'renderer/skin/models/SkinImage'

class ImageMap {
  skinImage: SkinImage
  filename: string

  x: number
  y: number

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
  maps = [] as ImageMap[]

  constructor(public options: SkinElementOptions, imageMap: any, images: SkinImage[]) {
    this.registerImages(imageMap, images)
  }

  registerImages(imageMap: any, images: SkinImage[]) {
    this.maps = imageMap.map((options: any) => {
      const filename = options.filename
      const skinImage = images.find(img => img.id == filename)

      return Object.assign(
        {
          skinImage,
        },
        options,
      )
    })
  }

  renderLayer(context: CanvasRenderingContext2D, map: ImageMap) {
    const { canvas } = context
    const { width, height } = canvas
    const image = map.skinImage.image

    // the multiplier here is artificial scaling
    // since the default scale is too small in most cases
    const scale = (1 / map.skinImage.resolution) * 1.8

    context.save()

    context.translate(width / 2, height / 2)
    context.scale(scale, scale)
    context.translate(image.width / -2, image.height / -2)

    context.drawImage(image, 0, 0)

    context.restore()

    if (map.colored) {
      context.globalCompositeOperation = 'source-atop'
      context.fillStyle = 'rgb(255, 85, 171)'
      context.fillRect(0, 0, width, height)
    }

    context.globalCompositeOperation = 'source-over'
  }

  render(context: CanvasRenderingContext2D) {
    const validMaps = this.maps.filter(map => map.skinImage != null)

    const images = validMaps.map(map => map.skinImage.image)

    const { canvas } = context

    canvas.width = this.options.width
    canvas.height = this.options.height

    // REFACTOR REFACTOR REFACTOR
    images.forEach(img => {
      if (img.width > canvas.width) canvas.width = img.width
      if (img.height > canvas.height) canvas.height = img.height
    })

    context.imageSmoothingEnabled = false

    validMaps.forEach(map => this.renderLayer(context, map))
  }
}
