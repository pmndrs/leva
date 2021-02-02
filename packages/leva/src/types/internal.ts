import { InputWithSettings, SpecialInput } from './public-types'

export type DataInput = {
  type: string
  value: unknown
  settings?: object
  count: number
}

export type Data = {
  [key: string]: DataInput | (SpecialInput & { count: number })
}

export type Tree = {
  [key: string]: { __levaInput: true; valueKey: string; path: string } | Tree
}

export type LevaInputProps<V, InternalSettings = {}, DisplayValue = any> = {
  valueKey: string
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
