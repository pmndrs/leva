export const clamp = (x: number, min: number, max: number) => (x > max ? max : x < min ? min : x)
export const floor = (min: number, x: number) => Math.max(min, Math.floor(x))
export const pad = (x: number, pad: number) => String(x).padStart(pad, '0')

const log10 = Math.log(10)

export function getStep(number: number) {
  let n = Math.abs(+String(number).replace('.', '')) //remove decimal and make positive
  if (n === 0) return 0.01
  while (n !== 0 && n % 10 === 0) n /= 10
  //kill the 0s at the end of n
  const significantDigits = Math.floor(Math.log(n) / log10) + 1
  const numberLog = Math.floor(Math.log10(Math.abs(number)))
  const step = Math.pow(10, numberLog - significantDigits)
  return step / 10
}

export const range = (v: number, min: number, max: number) => (v - min) / (max - min)
export const invertedRange = (p: number, min: number, max: number) => p * (max - min) + min
