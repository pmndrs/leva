/**
 * Types exposed through the public API
 *
 * @note I wanted to use the types in the *-plugin.ts files and just assemble them here,
 * but the conditional types can't be broken up into separate modules, so I opted to just
 * write all of them here.
 */
import { SpecialInput, SpecialInputTypes, FolderSettings } from './types'

type InputWithSettings<T, K = null> = T | ({ value: T } & K)

type NumberSettings = { min?: number; max?: number }
type NumberInput = InputWithSettings<number, NumberSettings>

type Point2DArray = [number, number]
type Point2DObject = { x: number; y: number }
type Point2D = Point2DArray | Point2DObject
type Point2DSettings = { x?: NumberSettings; y?: NumberSettings }
type Point2DInput = InputWithSettings<Point2D, Point2DSettings>

type Point3DArray = [number, number, number]
type Point3DObject = { x: number; y: number; z: number }
type Point3D = Point3DArray | Point3DObject
type Point3DSettings = { x?: NumberSettings; y?: NumberSettings; z?: NumberSettings }
type Point3DInput = InputWithSettings<Point3D, Point3DSettings>

type IntervalInput = { value: [number, number]; min: number; max: number }

type ImageInput = { image: undefined | string }

type SelectInput = { options: any[] | Record<string, any>; value?: any }

type SelectWithValueInput<T, K> = { options: T[] | Record<string, T>; value: K }
type SelectWithoutValueInput<T> = { options: T[] | Record<string, T> }

type ColorInput = { r: number; g: number; b: number; a?: number }

type SpringInput = {
  tension: number
  friction: number
  mass?: number
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
  | FolderOutput<any>

type NotAPrimitiveType = { ____: 'NotAPrimitiveType' }

type ColorObjectRGBA = { r: number; g: number; b: number; a: number }
type ColorObjectRGB = { r: number; g: number; b: number }

type PrimitiveToValue<S> = S extends ColorObjectRGBA
  ? { r: number; g: number; b: number; a: number }
  : S extends ColorObjectRGB
  ? { r: number; g: number; b: number }
  : S extends ImageInput
  ? string | undefined
  : S extends SpringInput
  ? { tension: number; friction: number; mass: number }
  : S extends SelectWithValueInput<infer T, infer K>
  ? T | K
  : S extends SelectWithoutValueInput<infer T>
  ? T
  : S extends IntervalInput
  ? [number, number]
  : S extends Point3DObject
  ? { x: number; y: number; z: number }
  : S extends Point3DArray
  ? [number, number, number]
  : S extends Point2DObject
  ? { x: number; y: number }
  : S extends Point2DArray
  ? [number, number]
  : S extends { value: infer G }
  ? PrimitiveToValue<G>
  : S extends number
  ? number
  : S extends string
  ? string
  : S extends boolean
  ? boolean
  : never

export type SchemaToValues<S> = BeautifyUnionType<UnionToIntersection<Leaves<S>>>

export type Schema = Record<string, SchemaItem>

export type FolderOutput<FlattenedSchema> = {
  type: SpecialInputTypes.FOLDER
  schema: Schema
  settings: FolderSettings
  // this prop only exists in the types
  ___flattenedSchema: FlattenedSchema
}

export type Leaves<T, P extends string | number | symbol = ''> = {
  0: T extends { ___flattenedSchema: infer F } ? { [K in keyof F]: Join<F, K, F[K]> } : never
  1: never
  2: { [i in P]: PrimitiveToValue<T> }
  3: { [K in keyof T]: Join<T, K, Leaves<T[K], K>> }[keyof T]
  4: ''
}[T extends FolderOutput<any>
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
