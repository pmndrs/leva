/**
 * Types exposed through the public API
 */
import { VectorSettings } from '../components/Vector'
import { BeautifyUnionType, UnionToIntersection } from './utils'

export type RenderFn = (get: (key: string) => any) => boolean

export type InputWithSettings<V extends unknown, Settings = {}> = {
  value: V
} & Settings

export type MergedInputWithSettings<V, Settings = {}> = V | InputWithSettings<V, Settings>

export enum SpecialInputTypes {
  SEPARATOR = 'SEPARATOR',
  BUTTON = 'BUTTON',
  MONITOR = 'MONITOR',
  FOLDER = 'FOLDER',
}

export type ButtonInput = {
  type: SpecialInputTypes.BUTTON
  onClick: () => any
}

export type MonitorSettings = { graph: boolean; interval: number }

export type MonitorInput = {
  type: SpecialInputTypes.MONITOR
  objectOrFn: React.MutableRefObject<any> | Function
  settings: MonitorSettings
}

export type FolderSettings = { collapsed: boolean; render?: RenderFn }

export type SeparatorInput = {
  type: SpecialInputTypes.SEPARATOR
}

export type SpecialInput = MonitorInput | ButtonInput | SeparatorInput

type GenericSchemaItemOptions = { render?: RenderFn; label?: string }
// type StripGenericOptions<K> = K extends any[] ? K : K extends object ? Omit<K, keyof GenericSchemaItemOptions> : K

export type NumberSettings = { min?: number; max?: number; step?: number }
type NumberInput = MergedInputWithSettings<number, NumberSettings>

export type Vector = Record<string, number>

export type Vector2dArray = [number, number]
export type Vector2d = Vector2dArray | Vector
export type Vector2dSettings = VectorSettings<Vector2d, 'x' | 'y'> & { joystick?: boolean; lock?: boolean }
export type Vector2dInput = MergedInputWithSettings<Vector2d, Vector2dSettings>

export type Vector3dArray = [number, number, number]
export type Vector3d = Vector3dArray | Vector
export type Vector3dSettings = VectorSettings<Vector3d, 'x' | 'y' | 'z'> & { lock?: boolean }
export type Vector3dInput = MergedInputWithSettings<Vector3d, Vector3dSettings>

export type IntervalInput = { value: [number, number]; min: number; max: number }

export type ImageInput = { image: undefined | string }

type SelectInput = { options: any[] | Record<string, any>; value?: any }

type SelectWithValueInput<T, K> = { options: T[] | Record<string, T>; value: K }
type SelectWithoutValueInput<T> = { options: T[] | Record<string, T> }

export type ColorObjectInput = { r: number; g: number; b: number; a?: number }

type BooleanInput = boolean

type StringInput = string

export type FolderInput<Schema> = {
  type: SpecialInputTypes.FOLDER
  schema: Schema
  settings: FolderSettings
}

export type CustomInput<Value> = Value & { type: string; __customInput: true }

type SchemaItem =
  | NumberInput
  | MergedInputWithSettings<boolean>
  | MergedInputWithSettings<string>
  | IntervalInput
  | Vector2dInput
  | Vector3dInput
  | ImageInput
  | SelectInput
  | ColorObjectInput
  | BooleanInput
  | StringInput
  | SpecialInput
  | FolderInput<unknown>
  | CustomInput<unknown>

// type Merge<T, G extends Object> = T extends any[]
//   ? T
//   : T extends object
//   ? {
//       [K in keyof T]: K extends keyof G ? G[K] : T[K]
//     }
//   : T

type SchemaItemWithOptions = SchemaItem & GenericSchemaItemOptions

export type Schema = Record<string, SchemaItemWithOptions>

type NotAPrimitiveType = { ____: 'NotAPrimitiveType' }

type ColorObjectRGBA = { r: number; g: number; b: number; a: number }
type ColorObjectRGB = { r: number; g: number; b: number }

type PrimitiveToValue<S> = S extends CustomInput<infer I>
  ? I
  : S extends ColorObjectRGBA
  ? { r: number; g: number; b: number; a: number }
  : S extends ColorObjectRGB
  ? { r: number; g: number; b: number }
  : S extends ImageInput
  ? string | undefined
  : S extends SelectWithValueInput<infer T, infer K>
  ? T | K
  : S extends SelectWithoutValueInput<infer T>
  ? T
  : S extends IntervalInput
  ? [number, number]
  : S extends { value: infer G }
  ? PrimitiveToValue<G>
  : S extends Vector
  ? S
  : S extends Vector3dArray
  ? [number, number, number]
  : S extends Vector2dArray
  ? [number, number]
  : S extends number
  ? number
  : S extends string
  ? string
  : S extends boolean
  ? boolean
  : NotAPrimitiveType

export type SchemaToValues<S> = BeautifyUnionType<UnionToIntersection<Leaves<S>>>

type Leaf = { ___leaf: 'leaf' }
type Join<T, K extends keyof T, P> = Leaf extends P ? { [i in K]: T[K] } : P

export type Leaves<T, P extends string | number | symbol = ''> = {
  // if it's a folder we run the type check on it's schema key
  0: T extends { schema: infer F } ? { [K in keyof F]: Join<F, K, F[K]> } : never
  1: never
  // if the leaf is an object, we run the type check on each of its keys
  2: { [i in P]: PrimitiveToValue<T> }
  // recursivity
  3: { [K in keyof T]: Join<T, K, Leaves<T[K], K>> }[keyof T]
  // dead end
  4: Leaf
}[P extends ''
  ? 3
  : T extends FolderInput<unknown>
  ? 0
  : T extends SpecialInput
  ? 1
  : PrimitiveToValue<T> extends NotAPrimitiveType
  ? T extends object
    ? 3
    : 4
  : 2]

/**
 * If P is '' then T is the whole schema and we shouldn't run any type check
 * on the schema, to the risk that { a: 1, b: 2 } is recognized as Vector
 * instead of a two number inputs.
 */
