// @ts-expect-error
import v8n from 'v8n'

export const schema = (o: any) =>
  v8n()
    .boolean()
    .test(o)
