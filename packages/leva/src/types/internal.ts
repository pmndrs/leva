import { InputWithSettings, SpecialInput, RenderFn } from './public-types'

export type DataInput = {
  type: string
  value: unknown
  settings?: object
}

export type DataItem = (DataInput | SpecialInput) & { render?: RenderFn }

export type Data = {
  [key: string]: DataItem & { count: number; key: string }
}

export type Tree = {
  [key: string]: { __levaInput: true; path: string } | Tree
}

export type LevaInputProps<V, InternalSettings = {}, DisplayValue = any> = {
  label: string
  displayValue: DisplayValue
  value: V
  onChange: React.Dispatch<any>
  onUpdate: (v: any | ((_v: any) => any)) => void
  settings: InternalSettings
}

export type Plugin<Input, Value = Input, Settings = {}, InternalSettings = {}> = {
  component: React.ComponentType
  schema?: (value: any, settings?: Settings) => boolean
  format?: (value: any, settings: InternalSettings) => any
  validate?: (value: any, settings: InternalSettings) => boolean
  sanitize?: (value: any, settings: InternalSettings) => Value
  normalize?: (input: InputWithSettings<Input, Settings>) => { value: Value; settings?: InternalSettings }
}
