// @ts-expect-error
import v8n from 'v8n'
import { ValueInputTypes } from '../../types'

const number = v8n().number()

export const schema = (o: any) =>
  v8n()
    .schema({
      tension: number,
      friction: number,
      mass: v8n().optional(number),
    })
    .test(o) && ValueInputTypes.SPRING
