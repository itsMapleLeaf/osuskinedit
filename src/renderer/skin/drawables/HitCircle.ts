import {
  DrawableProps,
  DrawableAlignment,
  Layer,
  Bitmap
} from 'renderer/canvas/drawables'

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

    console.log(this)
  }

  createFiltersAndTransforms() {
    this.colorizeFilter = new ColorizeFilter({
      color: Color('blue')
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
      height: approachCircleImage.height * this.approachCircleScale
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
      align: DrawableAlignment.center
    })

    const hitCircleDrawable = new Bitmap({
      image: hitCircleImage
    })

    const hitCircleOverlayDrawable = new Bitmap({
      image: hitCircleOverlayImage
    })

    const numberDrawable = this.numberDrawable = new Bitmap({
      image: numberImage,
      align: DrawableAlignment.center
    })

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
      align: DrawableAlignment.center,
      opacity: 0
    })

    approachCircleDrawable.addFilter(this.colorizeFilter)
    approachCircleDrawable.addTransform(this.approachScaleTransform)

    this.approachCircleDrawable = approachCircleDrawable
  }

  frame() {
    if (this.hasClicked) {
      if (this.waitTimer < 0) return this.resetAnimation()

      this.waitTimer -= 0.03

      return
    }

    if (this.hasApproached) {
      this.fadeOutCircle()
    } else {
      this.decreaseApproachCircle()
    }
  }

  resetAnimation() {
    Object.assign(this.approachScaleTransform, {
      scaleX: this.approachCircleScale,
      scaleY: this.approachCircleScale
    })

    Object.assign(this.hitCircleScaleTransform, {
      scaleX: 1,
      scaleY: 1
    })

    this.hitCircleLayer.opacity = 1
    this.approachCircleDrawable.opacity = 0
    this.numberDrawable.opacity = 1

    // debugger

    this.hasClicked = false
    this.hasApproached = false
    this.waitTimer = 2
  }

  decreaseApproachCircle() {
    const newScale = this.approachScaleTransform.scaleX - 0.03

    this.approachCircleDrawable.opacity += 0.01

    Object.assign(this.approachScaleTransform, {
      scaleX: newScale,
      scaleY: newScale
    })

    if (newScale < 1) {
      this.approachCircleDrawable.opacity = 0
      this.hasApproached = true
    }
  }

  fadeOutCircle() {
    const newScale = this.hitCircleScaleTransform.scaleX + 0.03
    const newOpacity = this.hitCircleLayer.opacity - 0.05

    this.numberDrawable.opacity = 0

    if (newOpacity > 0) {
      this.hitCircleLayer.opacity = newOpacity
    } else {
      this.hitCircleLayer.opacity = 0
    }

    Object.assign(this.hitCircleScaleTransform, {
      scaleX: newScale,
      scaleY: newScale
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
    this.frame()
    this.renderDrawables()
  }
}
