import { Input } from './types'

export const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(max, x))
export const floor = (min: number, x: number) => Math.max(min, Math.floor(x))
export const pad = (x: number, pad: number) => String(x).padStart(pad, '0')
export const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('.')

export const prefix = (obj: object, p: string) =>
  Object.entries(obj).reduce((acc, [key, v]) => ({ ...acc, [join(p, key)]: v }), {})

export function getKeyPath(path: string) {
  const dir = path.split('.')
  return [dir.pop(), dir.join('.') || undefined]
}

export function pick<K extends string, T extends { [k in K]: unknown }>(object: T, keys: K[]) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key]
    }
    return obj
  }, {} as { [k in K]: T[k] })
}

// returns a value in the form of { value, settings}
export function normalizeInput(input: Input) {
  if (typeof input === 'object' && 'value' in input) {
    const { value, ...settings } = input
    return { value, settings, type: typeof value }
  }
  return { value: input, type: typeof input }
}
