import { CanvasRenderable } from 'renderer/canvas/types'

export function clearContext(context: CanvasRenderingContext2D) {
  const { width, height } = context.canvas
  context.clearRect(0, 0, width, height)
}

export function sizeToContents(canvas: HTMLCanvasElement, images: CanvasRenderable[]) {
  canvas.width = Math.max(...images.map(i => i.width))
  canvas.height = Math.max(...images.map(i => i.height))
}

export function resizeImage(image: CanvasRenderable, targetWidth: number, targetHeight: number) {
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight

  const context = canvas.getContext('2d')!
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, targetWidth, targetHeight)

  return canvas
}

export function drawCentered(
  context: CanvasRenderingContext2D,
  image: CanvasRenderable,
  x = 0,
  y = 0,
) {
  context.save()

  context.translate(-image.width / 2, -image.height / 2)
  context.drawImage(image, x, y)

  context.restore()
}
