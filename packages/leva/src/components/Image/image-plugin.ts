import { ImageInput } from '../../types'

export const sanitize = (v: any) => {
  if (!v) return undefined
  try {
    return URL.createObjectURL(v)
  } catch (e) {
    return undefined
  }
}

export const schema = (_o: any, s: any) => typeof s === 'object' && 'image' in s

export const normalize = ({ image }: ImageInput) => {
  return { value: image }
}
