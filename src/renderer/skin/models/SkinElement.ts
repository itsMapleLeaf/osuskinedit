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

class SkinElementOptions {
  id: string
  name: string
  width: number
  height: number
}

export default class SkinElement extends SkinElementOptions {
  maps = [] as ImageMap[]

  constructor(options: SkinElementOptions, imageMap: any, images: SkinImage[]) {
    super()

    this.assignOptions(options)
    this.registerImages(imageMap, images)
  }

  assignOptions(options: SkinElementOptions) {
    const { id, name, width, height } = options

    Object.assign(this, {
      id,
      name,
      width,
      height,
    })
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

    const centeredX = width / 2 - image.width / 2
    const centeredY = height / 2 - image.height / 2

    context.drawImage(image, centeredX, centeredY)

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

    canvas.width = this.width
    canvas.height = this.height

    // REFACTOR REFACTOR REFACTOR
    images.forEach(img => {
      if (img.width > canvas.width) canvas.width = img.width
      if (img.height > canvas.height) canvas.height = img.height
    })

    context.imageSmoothingEnabled = false

    validMaps.forEach(map => this.renderLayer(context, map))
  }
}
