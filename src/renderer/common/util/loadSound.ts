export function loadSound(src: string) {
  return new Promise<HTMLAudioElement>((resolve, reject) => {
    const sound = new Audio(src)
    sound.onload = () => resolve(sound)
    sound.onerror = event => reject(event.error)
  })
}
