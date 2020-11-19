// @ts-expect-error
import v8n from 'v8n'
import { ValueInputTypes } from '../../types'

const number = v8n().number()

// prettier-ignore
const point2dArray = v8n().array().length(2).every.number()
const point2dObj = v8n().schema({ x: number, y: number })
export const schema = (o: any) =>
  v8n()
    .passesAnyOf(point2dObj, point2dArray)
    .test(o) && ValueInputTypes.POINT2D
