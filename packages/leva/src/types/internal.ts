import { SpecialInput, RenderFn } from './public-types'

type Decorators = {
  count: number
  key: string
  label: string
  render?: RenderFn
}

export type DataInput = {
  type: string
  value: unknown
  settings?: object
} & Decorators

export type DataItem = DataInput | (SpecialInput & Decorators)

export type Data = Record<string, DataItem>

export type Tree = {
  [key: string]: { __levaInput: true; path: string } | Tree
}

export type LevaInputProps<V, InternalSettings = {}, DisplayValue = any> = {
  label: string
  path?: string
  displayValue: DisplayValue
  value: V
  onChange: React.Dispatch<any>
  onUpdate: (v: any | ((_v: any) => any)) => void
  settings: InternalSettings
}

export type Plugin<Input, Value = Input, InternalSettings = {}> = {
  component: React.ComponentType
  format?: (value: any, settings: InternalSettings) => any
  normalize?: (input: Input) => { value: Value; settings?: InternalSettings }
  validate?: (value: any, settings: any) => boolean
  sanitize?: (value: any, settings: any, prevValue: any) => Value
}

export type InternalPlugin<Input, Value = Input, Settings = {}, InternalSettings = {}> = Plugin<
  Input,
  Value,
  InternalSettings
> & {
  schema: (value: any, settings?: Settings) => boolean
}
