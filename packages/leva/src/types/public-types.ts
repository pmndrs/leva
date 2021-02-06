/**
 * Types exposed through the public API
 */
import { BeautifyUnionType, UnionToIntersection, Join, Leaf } from './utils'

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

export type NumberSettings = { min?: number; max?: number; step?: number }
type NumberInput = MergedInputWithSettings<number, NumberSettings>

export type Point2dArray = [number, number]
export type Point2dObject = { x: number; y: number }
export type Point2d = Point2dArray | Point2dObject
export type Point2dSettings = { x?: NumberSettings; y?: NumberSettings }
export type Point2dInput = MergedInputWithSettings<Point2d, Point2dSettings>

export type Point3dArray = [number, number, number]
export type Point3dObject = { x: number; y: number; z: number }
export type Point3d = Point3dArray | Point3dObject
export type Point3dSettings = { x?: NumberSettings; y?: NumberSettings; z?: NumberSettings }
export type Point3dInput = MergedInputWithSettings<Point3d, Point3dSettings>

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

export type CustomInput<Value> = Value & { __customInput: true }

type SchemaItem =
  | NumberInput
  | MergedInputWithSettings<boolean>
  | MergedInputWithSettings<string>
  | IntervalInput
  | Point2dInput
  | Point3dInput
  | ImageInput
  | SelectInput
  | ColorObjectInput
  | BooleanInput
  | StringInput
  | SpecialInput
  | FolderInput<unknown>
  | CustomInput<unknown>

export type Schema = Record<string, SchemaItem & { render?: RenderFn }>

type NotAPrimitiveType = { ____: 'NotAPrimitiveType' }

type ColorObjectRGBA = { r: number; g: number; b: number; a: number }
type ColorObjectRGB = { r: number; g: number; b: number }

type PrimitiveToValue<S> = S extends ColorObjectRGBA
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
  : S extends Point3dObject
  ? { x: number; y: number; z: number }
  : S extends Point3dArray
  ? [number, number, number]
  : S extends Point2dObject
  ? { x: number; y: number }
  : S extends Point2dArray
  ? [number, number]
  : S extends { value: infer G }
  ? PrimitiveToValue<G>
  : S extends number
  ? number
  : S extends string
  ? string
  : S extends boolean
  ? boolean
  : NotAPrimitiveType

export type SchemaToValues<S> = BeautifyUnionType<UnionToIntersection<Leaves<S>>>

export type Leaves<T, P extends string | number | symbol = ''> = {
  0: T extends { schema: infer F } ? { [K in keyof F]: Join<F, K, F[K]> } : never
  1: never
  2: { [i in P]: PrimitiveToValue<T> }
  3: { [K in keyof T]: Join<T, K, Leaves<T[K], K>> }[keyof T]
  4: Leaf
  5: { [i in P]: T extends CustomInput<infer I> ? I : never } // CustomInput type
}[T extends FolderInput<any>
  ? 0
  : T extends SpecialInput
  ? 1
  : PrimitiveToValue<T> extends NotAPrimitiveType
  ? T extends CustomInput<{}>
    ? 5
    : T extends object
    ? 3
    : 4
  : 2]
