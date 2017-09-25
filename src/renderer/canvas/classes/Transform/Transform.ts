import Drawable from 'renderer/canvas/classes/Drawable'

export interface TransformProps {}

export default abstract class Transform {
  constructor(options: TransformProps) {
    Object.assign(this, options)
  }

  abstract apply(context: CanvasRenderingContext2D, drawable: Drawable): void
}
