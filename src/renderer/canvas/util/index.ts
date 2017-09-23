import { CanvasRenderable } from '../types'

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
