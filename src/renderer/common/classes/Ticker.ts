function animationFrame() {
  return new Promise(requestAnimationFrame)
}

export default class Ticker {
  running = false

  constructor(private tickFunction: (dt: number) => any) {}

  async start() {
    this.running = true

    let currentTime = await animationFrame()

    while (true) {
      const frameTime = await animationFrame()
      const elapsedSeconds = (frameTime - currentTime) / 1000
      currentTime = frameTime

      this.tickFunction(elapsedSeconds)

      if (!this.running) break
    }
  }

  stop() {
    this.running = false
  }
}
