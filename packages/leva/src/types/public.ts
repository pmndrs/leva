/**
 * Types exposed through the public API
 */
import type { VectorSettings } from '../components/Vector/vector-types'
import { StoreType, Data } from './internal'
import type { BeautifyUnionType, UnionToIntersection } from './utils'

export type RenderFn = (get: (key: string) => any) => boolean

/**
 * Utility types that joins a value with its settings
 */
export type InputWithSettings<V extends unknown, Settings = {}, K extends string = 'value'> = {
  [key in K]: V
} &
  Settings

/**
 * Either the raw value, either the value with its settings
 * In other words => value || { value, ...settings }
 */
export type MergedInputWithSettings<V, Settings = {}, K extends string = 'value'> =
  | V
  | InputWithSettings<V, Settings, K>

/**
 * Special Inputs
 */
export enum SpecialInputs {
  BUTTON = 'BUTTON',
  BUTTON_GROUP = 'BUTTON_GROUP',
  MONITOR = 'MONITOR',
  FOLDER = 'FOLDER',
}

export enum LevaInputs {
  SELECT = 'SELECT',
  IMAGE = 'IMAGE',
  NUMBER = 'NUMBER',
  COLOR = 'COLOR',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  INTERVAL = 'INTERVAL',
  VECTOR3D = 'VECTOR3D',
  VECTOR2D = 'VECTOR2D',
}

export type ButtonInput = {
  type: SpecialInputs.BUTTON
  onClick: () => any
}

export type ButtonGroupInput = {
  type: SpecialInputs.BUTTON_GROUP
  opts: { [title: string]: () => void }
}

export type MonitorSettings = { graph?: boolean; interval?: number }

export type MonitorInput = {
  type: SpecialInputs.MONITOR
  objectOrFn: React.MutableRefObject<any> | Function
  settings: MonitorSettings
}

export type SpecialInput = MonitorInput | ButtonInput | ButtonGroupInput

export type FolderSettings = { collapsed?: boolean; render?: RenderFn }

export type NumberSettings = { min?: number; max?: number; step?: number }

export type VectorObj = Record<string, number>

export type Vector2dArray = [number, number]
export type Vector2d = Vector2dArray | VectorObj
export type Vector2dSettings = VectorSettings<Vector2d, 'x' | 'y'> & { joystick?: boolean | 'invertY'; lock?: boolean }
export type Vector2dInput = MergedInputWithSettings<Vector2d, Vector2dSettings>

export type Vector3dArray = [number, number, number]
export type Vector3d = Vector3dArray | VectorObj
export type Vector3dSettings = VectorSettings<Vector3d, 'x' | 'y' | 'z'> & { lock?: boolean }
export type Vector3dInput = MergedInputWithSettings<Vector3d, Vector3dSettings>

export type IntervalInput = { value: [number, number]; min: number; max: number }

export type ImageInput = { image: undefined | string }

type SelectInput = { options: any[] | Record<string, any>; value?: any }

type SelectWithValueInput<T, K> = { options: T[] | Record<string, T>; value: K }
type SelectWithoutValueInput<T> = { options: T[] | Record<string, T> }

type ColorRgbaInput = { r: number; g: number; b: number; a?: number }
type ColorHslaInput = { h: number; s: number; l: number; a?: number }
type ColorHsvaInput = { h: number; s: number; v: number; a?: number }
export type ColorVectorInput = ColorRgbaInput | ColorHslaInput | ColorHsvaInput

type BooleanInput = boolean

type StringInput = string

export type FolderInput<Schema> = {
  type: SpecialInputs.FOLDER
  schema: Schema
  settings: FolderSettings
}

export type CustomInput<Value> = { type: string; __customInput: Value }

type SchemaItem =
  | InputWithSettings<number, NumberSettings>
  | InputWithSettings<boolean>
  | InputWithSettings<string>
  | IntervalInput
  | ColorVectorInput
  | Vector2dInput
  | Vector3dInput
  | ImageInput
  | SelectInput
  | BooleanInput
  | StringInput
  | CustomInput<unknown>

type GenericSchemaItemOptions = {
  render?: RenderFn
  label?: string | JSX.Element
  hint?: string
}

export type InputOptions = GenericSchemaItemOptions & {
  optional?: boolean
  disabled?: boolean
  onChange?: (v: any) => void
}

type SchemaItemWithOptions =
  | number
  | boolean
  | string
  | (SchemaItem & InputOptions)
  | (SpecialInput & GenericSchemaItemOptions)
  | FolderInput<unknown>

export type Schema = Record<string, SchemaItemWithOptions>

/**
 * Dummy type used internally to flag non compatible input types.
 * @internal
 */
type NotAPrimitiveType = { ____: 'NotAPrimitiveType' }

type PrimitiveToValue<S> = S extends CustomInput<infer I>
  ? BeautifyUnionType<I>
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
  : S extends VectorObj
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

export type SchemaToValues<Schema, IncludeTransient extends boolean = false> = BeautifyUnionType<
  UnionToIntersection<Leaves<IncludeTransient, Schema>>
>

type Leaf = { ___leaf: 'leaf' }
type Join<T, K extends keyof T, P> = Leaf extends P ? { [i in K]: T[K] } : P

export type Leaves<IncludeTransient extends boolean, T, P extends string | number | symbol = ''> = {
  // if it's a folder we run the type check on it's schema key
  0: T extends { schema: infer F } ? { [K in keyof F]: Join<F, K, F[K]> } : never
  1: never
  // if the leaf is an object, we run the type check on each of its keys
  2: {
    [i in P]: T extends { optional: true } ? PrimitiveToValue<T> | undefined : PrimitiveToValue<T>
  }
  // recursivity
  3: { [K in keyof T]: Join<T, K, Leaves<IncludeTransient, T[K], K>> }[keyof T]
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
  : T extends { onChange: any } // if an input has the onChange property then it's transient and isn't returned
  ? IncludeTransient extends true
    ? 2
    : 1
  : 2]

/**
 * If P is '' then T is the whole schema and we shouldn't run any type check
 * on the schema, to the risk that { a: 1, b: 2 } is recognized as Vector
 * instead of a two number inputs.
 */

/**
 * Interface to build a plugin.
 *
 * @public
 */
export interface Plugin<Input, Value = Input, InternalSettings = {}> {
  /**
   * The component that shows the input value;
   */
  component: React.ComponentType
  /**
   * Normalizes the input into a { value, settings } object.
   *
   * @example
   * Let's consider a color with an inverted settings option that computes the negative
   * of that color. The plugin could look something like:
   * ```ts
   * myColorPlugin({ color: '#fff', inverted: true })
   * ```
   *
   * In that case, your normalize funciton would be something like:
   * ```ts
   * function normalize({ color, inverted }) {
   *   return { value: color, settings: { inverted }}
   * }
   * ```
   */
  normalize?: (input: Input, path: string, data: Data) => { value: Value; settings?: InternalSettings }
  /**
   * Sanitizes the user value before registering it to the store. For
   * example, the Number plugin would santize "3.00" into 3. If the provided
   * value isn't formatted properly, the sanitize function should throw.
   */
  sanitize?: (value: any, settings: InternalSettings, prevValue: any, path: string, store: StoreType) => Value
  /**
   * Formats the value into the value that will be displayed by the component.
   * If the input value of the Number plugin, then format will add proper
   * padding and show "3.00".
   * (Prop name in useInputContext context hook is `displayedValue`)
   */
  format?: (value: any, settings: InternalSettings) => any
}

export type InputContextProps = {
  id: string
  label: string | JSX.Element
  hint?: string
  path: string
  key: string
  optional: boolean
  disabled: boolean
  disable: (flag: boolean) => void
  storeId: string
  value: unknown
  displayValue: unknown
  onChange: React.Dispatch<any>
  onUpdate: (v: any | ((v: any) => any)) => void
  settings: unknown
  setSettings: (v: any) => void
}

/**
 * Interface consumed by the useInputContext hook so that its returned values
 * are properly typed.
 *
 * @example
 * ```ts
 *  useInputContext<LevaInputProps<boolean>>()
 * ```
 * @public
 */
export interface LevaInputProps<V, InternalSettings = {}, DisplayValue = V> {
  path?: string
  id?: string
  hint?: string
  displayValue: DisplayValue
  value: V
  onChange: React.Dispatch<any>
  onUpdate: (v: any | ((v: any) => any)) => void
  settings: InternalSettings
  setSettings: (v: Partial<InternalSettings>) => void
}
