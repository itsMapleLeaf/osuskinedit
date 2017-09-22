export default class SkinImage {
  image = new Image()

  constructor(
    public id: string,
    public imagePath: string,
  ) {
    this.image.src = imagePath
  }
}
