import { ImageInput } from '../../types'

export const sanitize = (v: any) => {
  if (!v) return undefined
  try {
    if (v instanceof File) return URL.createObjectURL(v)
    return v
  } catch (e) {
    return undefined
  }
}

export const validate = (v: any) =>
  v === undefined || v instanceof File || (typeof v === 'string' && v.indexOf('blob:') === 0)

export const schema = (_o: any, s: any) => typeof s === 'object' && 'image' in s

export const normalize = ({ image }: ImageInput) => {
  return { value: image }
}
