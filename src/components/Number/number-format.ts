// @ts-expect-error
import v8n from 'v8n'
import { ValueInputTypes } from '../../types'

export const schema = (o: any) =>
  v8n()
    .number()
    .test(o) && ValueInputTypes.NUMBER
