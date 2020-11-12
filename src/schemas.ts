// @ts-expect-error
import v8n from 'v8n'

type V8N = { test: (o: any) => boolean }

const string: V8N = v8n().string()
const number: V8N = v8n().number()
const boolean: V8N = v8n().boolean()

// prettier-ignore
const point2dArray: V8N = v8n().array().length(2).every.number()
const point2dObj: V8N = v8n().schema({ x: v8n().number(), y: v8n().number() })
const point2d: V8N = v8n().passesAnyOf(point2dObj, point2dArray)

// prettier-ignore
const point3dArray: V8N = v8n().array().length(3).every.number()
const point3dObj: V8N = v8n().schema({ x: v8n().number(), y: v8n().number(), z: v8n().number() })
const point3d: V8N = v8n().passesAnyOf(point3dObj, point3dArray)

const checkFn = (schema: V8N, type: string) => (o: any) => (schema.test(o) ? type : false)

const checkers = [
  checkFn(string, 'STRING'),
  checkFn(number, 'NUMBER'),
  checkFn(boolean, 'BOOLEAN'),
  checkFn(point3d, 'POINT3D'),
  checkFn(point2d, 'POINT2D'),
]

export function getValueType(o: any) {
  for (let checker of checkers) {
    const type = checker(o)
    if (type) return type
  }
  return undefined
}
