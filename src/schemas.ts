// @ts-expect-error
import v8n from 'v8n'
// @ts-ignore
import parse from 'color-parser'

type V8N = { test: (o: any) => boolean }

v8n.extend({ color: () => (value: any) => !!parse(value) })

const string: V8N = v8n().string()
const number: V8N = v8n().number()
const boolean: V8N = v8n().boolean()

const colorString: V8N = v8n().color()
const colorObj: V8N = v8n().schema({ r: number, g: number, b: number, a: v8n().optional(number) })
const color: V8N = v8n().passesAnyOf(colorString, colorObj)

// prettier-ignore
const point2dArray: V8N = v8n().array().length(2).every.number()
const point2dObj: V8N = v8n().schema({ x: number, y: number })
const point2d: V8N = v8n().passesAnyOf(point2dObj, point2dArray)

// prettier-ignore
const point3dArray: V8N = v8n().array().length(3).every.number()
const point3dObj: V8N = v8n().schema({ x: number, y: number, z: number })
const point3d: V8N = v8n().passesAnyOf(point3dObj, point3dArray)

const spring: V8N = v8n().schema({ tension: number, friction: number, mass: v8n().optional(number) })

const checkFn = (schema: V8N, type: string) => (o: any) => (schema.test(o) ? type : false)

const checkers = [
  checkFn(number, 'NUMBER'),
  checkFn(color, 'COLOR'),
  checkFn(string, 'STRING'),
  checkFn(boolean, 'BOOLEAN'),
  checkFn(point3d, 'POINT3D'),
  checkFn(point2d, 'POINT2D'),
  checkFn(spring, 'SPRING'),
]

export function getValueType(value: any) {
  for (let checker of checkers) {
    const type = checker(value)
    if (type) return type
  }
  return undefined
}
