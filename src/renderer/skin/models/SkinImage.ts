export default class SkinImage {
  image = new Image()
  promise: Promise<any>

  constructor(
    public id: string,
    public imagePath: string,
  ) {
    this.load(imagePath)
  }

  load(imagePath: string) {
    this.promise = new Promise((resolve, reject) => {
      this.image.src = imagePath

      this.image.onload = resolve
      this.image.onerror = reject
    })
  }
}
