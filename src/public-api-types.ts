/**
 * Types exposed through the public API
 *
 * @note I wanted to use the types in the *-plugin.ts files and just assemble them here,
 * but the conditional types can't be broken up into separate modules, so I opted to just
 * write all of them here.
 */
import { SpecialInput, FolderInput } from './types'

type NumberInput = number | { value: number; min?: number; max?: number }

type Point2DInput = [NumberInput, NumberInput] | { x: NumberInput; y: NumberInput }
type Point3DInput = [NumberInput, NumberInput, NumberInput] | { x: NumberInput; y: NumberInput; z: NumberInput }

type IntervalInput = {
  value: [number, number]
  min: number
  max: number
}

type ImageInput = {
  image: undefined
}

type SelectInput = { options: any[] | Record<string, any>; value?: any }

type ColorInput = {
  r: number
  g: number
  b: number
  a?: number
}

type SpringInput = {
  tension: number
  friction: number
  mass?: number
}

type SpringOutput = {
  tension: number
  friction: number
  mass: number
}

type BooleanInput = boolean

type StringInput = string

type SchemaItem =
  | NumberInput
  | IntervalInput
  | SpecialInput
  | Point2DInput
  | Point3DInput
  | ImageInput
  | SelectInput
  | ColorInput
  | SpringInput
  | BooleanInput
  | StringInput
  | FolderInput<any>

type NotAPrimitiveType = { ____: 'NotAPrimitiveType' }

type ColorObjectRGBA = {
  r: number
  g: number
  b: number
  a: number
}

type ColorObjectRGB = {
  r: number
  g: number
  b: number
}

type PrimitiveToValue<S> = S extends ColorObjectRGBA
  ? ColorObjectRGBA
  : S extends ColorObjectRGB
  ? ColorObjectRGB
  : S extends { options: Array<infer T> }
  ? T
  : S extends { options: Record<string, any> }
  ? string
  : S extends SpringInput
  ? SpringOutput
  : S extends { x: NumberInput; y: NumberInput; z: NumberInput }
  ? { x: number; y: number; z: number }
  : S extends { x: NumberInput; y: NumberInput }
  ? { x: number; y: number }
  : S extends [NumberInput, NumberInput, NumberInput]
  ? [number, number, number]
  : S extends [NumberInput, NumberInput]
  ? [number, number]
  : S extends NumberInput[]
  ? number[]
  : S extends { image: undefined | string }
  ? string | undefined
  : S extends NumberInput
  ? number
  : S extends IntervalInput
  ? [number, number]
  : S extends StringInput
  ? string
  : S extends boolean
  ? boolean
  : NotAPrimitiveType

export type SchemaToValues<S> = BeautifyUnionType<UnionToIntersection<Leaves<S>>>

export type Schema = Record<string, SchemaItem>

type Leaves<T, P extends string | number | symbol = ''> = {
  0: T extends { schema: any } ? Join<T, 'schema', Leaves<T['schema']>> : never
  1: never
  2: { [i in P]: PrimitiveToValue<T> }
  3: { [K in keyof T]: Join<T, K, Leaves<T[K], K>> }[keyof T]
  4: ''
}[T extends FolderInput<any>
  ? 0
  : T extends SpecialInput
  ? 1
  : PrimitiveToValue<T> extends NotAPrimitiveType
  ? T extends object
    ? 3
    : 4
  : 2]

// Utils from https://github.com/pmndrs/use-tweaks/blob/92561618abbf43c581fc5950fd35c0f8b21047cd/src/types.ts#L70

/**
 * It does nothing but beautify union type
 *
 * ```
 * type A = { a: 'a' } & { b: 'b' } // { a: 'a' } & { b: 'b' }
 * type B = Id<{ a: 'a' } & { b: 'b' }> // { a: 'a', b: 'b' }
 * ```
 */
type BeautifyUnionType<T> = T extends infer TT ? { [k in keyof TT]: TT[k] } : never

type Join<T, K extends keyof T, P> = '' extends P ? { [i in K]: T[K] } : P

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
