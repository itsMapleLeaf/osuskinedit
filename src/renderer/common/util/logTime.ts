export function logTime(name: string, fn: Function) {
  const now = performance.now()
  fn()
  console.info(`Time for ${name}: ${performance.now() - now}ms`)
}
