import Drawable from 'renderer/canvas/classes/Drawable'

export default abstract class Transform {
  abstract apply(context: CanvasRenderingContext2D, drawable: Drawable): void
}
