export function logTime(name: string, fn: Function) {
  const now = performance.now()
  fn()
  console.log(`Time for ${name}: ${performance.now() - now}ms`)
}
