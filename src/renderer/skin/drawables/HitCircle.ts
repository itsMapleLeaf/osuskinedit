import { Bitmap, DrawableAnchor, DrawableProps, Layer } from 'renderer/canvas/drawables'

import { ColorizeFilter } from 'renderer/canvas/filters'
import { ScaleTransform } from 'renderer/canvas/transforms'

import Color from 'color'

import Skin from 'renderer/skin/models/Skin'

export interface HitCircleProps extends DrawableProps {
  skin: Skin
}

export default class HitCircle extends Layer {
  skin: Skin

  colorizeFilter: ColorizeFilter

  hitCircleLayer: Layer
  hitCircleScaleTransform: ScaleTransform

  approachCircleDrawable: Bitmap
  approachCircleScale = 3
  approachScaleTransform: ScaleTransform

  numberDrawable: Bitmap

  hasApproached = false
  hasClicked = false
  waitTimer = 2

  constructor(options: HitCircleProps) {
    super(options)

    Object.assign(this, options)

    this.prepare()
  }

  createFiltersAndTransforms() {
    this.colorizeFilter = new ColorizeFilter({
      color: Color('blue'),
    })

    this.approachScaleTransform = new ScaleTransform({
      scaleX: this.approachCircleScale,
      scaleY: this.approachCircleScale,
    })

    this.hitCircleScaleTransform = new ScaleTransform({
      scaleX: 1,
      scaleY: 1,
    })
  }

  getSize() {
    const approachCircleImage = this.skin.getImage('approachcircle').image

    return {
      width: approachCircleImage.width * this.approachCircleScale,
      height: approachCircleImage.height * this.approachCircleScale,
    }
  }

  createHitcircleLayer() {
    const { getImage } = this.skin

    const hitCircleImage = getImage('hitcircle')!.image
    const hitCircleOverlayImage = getImage('hitcircleoverlay')!.image
    const numberImage = getImage('default-1').image

    const { width, height } = this.getSize()

    const layer = new Layer({
      width: width,
      height: height,
      anchor: DrawableAnchor.center,
      opacity: 0,
    })

    const hitCircleDrawable = new Bitmap({
      image: hitCircleImage,
    })

    const hitCircleOverlayDrawable = new Bitmap({
      image: hitCircleOverlayImage,
    })

    const numberDrawable = (this.numberDrawable = new Bitmap({
      image: numberImage,
      anchor: DrawableAnchor.center,
    }))

    hitCircleDrawable.addFilter(this.colorizeFilter)

    layer.addDrawable(hitCircleDrawable)
    layer.addDrawable(hitCircleOverlayDrawable)
    layer.addDrawable(numberDrawable)
    layer.addTransform(this.hitCircleScaleTransform)

    this.hitCircleLayer = layer
  }

  createApproachCircleLayer() {
    const { getImage } = this.skin

    const approachCircleImage = getImage('approachcircle').image

    const approachCircleDrawable = new Bitmap({
      image: approachCircleImage,
      anchor: DrawableAnchor.center,
      opacity: 0,
    })

    approachCircleDrawable.addFilter(this.colorizeFilter)
    approachCircleDrawable.addTransform(this.approachScaleTransform)

    this.approachCircleDrawable = approachCircleDrawable
  }

  update(dt: number) {
    if (!this.hasApproached && !this.hasClicked) {
      this.hitCircleLayer.opacity = Math.min(this.hitCircleLayer.opacity + dt * 3, 1)
    }

    if (this.hasClicked) {
      if (this.waitTimer < 0) return this.resetAnimation()

      this.waitTimer -= dt

      return
    }

    if (this.hasApproached) {
      this.fadeOutCircle(dt)
    } else {
      this.decreaseApproachCircle(dt)
    }
  }

  resetAnimation() {
    Object.assign(this.approachScaleTransform, {
      scaleX: this.approachCircleScale,
      scaleY: this.approachCircleScale,
    })

    Object.assign(this.hitCircleScaleTransform, {
      scaleX: 1,
      scaleY: 1,
    })

    this.hitCircleLayer.opacity = 0
    this.approachCircleDrawable.opacity = 0
    this.numberDrawable.opacity = 1

    this.hasClicked = false
    this.hasApproached = false
    this.waitTimer = 2
  }

  decreaseApproachCircle(dt: number) {
    const newScale = this.approachScaleTransform.scaleX - dt * 2

    this.approachCircleDrawable.opacity += dt * 1

    Object.assign(this.approachScaleTransform, {
      scaleX: newScale,
      scaleY: newScale,
    })

    if (newScale < 1) {
      this.approachCircleDrawable.opacity = 0
      this.hasApproached = true
    }
  }

  fadeOutCircle(dt: number) {
    const newScale = this.hitCircleScaleTransform.scaleX + dt * 2
    const newOpacity = this.hitCircleLayer.opacity - dt * 5

    this.numberDrawable.opacity = 0

    if (newOpacity > 0) {
      this.hitCircleLayer.opacity = newOpacity
    } else {
      this.hitCircleLayer.opacity = 0
    }

    Object.assign(this.hitCircleScaleTransform, {
      scaleX: newScale,
      scaleY: newScale,
    })

    if (newOpacity < 0) {
      this.hasClicked = true
    }
  }

  prepare() {
    this.createFiltersAndTransforms()
    this.createHitcircleLayer()
    this.createApproachCircleLayer()

    this.addDrawable(this.hitCircleLayer)
    this.addDrawable(this.approachCircleDrawable)

    const { width, height } = this.getSize()

    this.width = width
    this.height = height
  }

  draw() {
    this.renderDrawables()
  }
}
