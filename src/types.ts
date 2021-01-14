import { Schema } from './public-api-types'

export enum SpecialInputTypes {
  SEPARATOR = 'SEPARATOR',
  BUTTON = 'BUTTON',
  MONITOR = 'MONITOR',
  FOLDER = 'FOLDER',
}

export type Folders = Record<string, FolderSettings>

export type ValueInputWithSettings<V extends unknown, Settings = {}> = {
  value: V
} & Settings

export type ValueInput<V, Settings = {}> = V | ValueInputWithSettings<V, Settings>

export type DataInput = {
  type: string
  value: unknown
  settings?: object
  count: number
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

export type FolderSettings = { collapsed: boolean }

export type FolderInput<S extends Schema = Schema> = {
  type: SpecialInputTypes.FOLDER
  schema: S
  settings: FolderSettings
}

export type SeparatorInput = {
  type: SpecialInputTypes.SEPARATOR
}

export type SpecialInput = MonitorInput | ButtonInput | SeparatorInput

export type Data = {
  [key: string]: DataInput | (SpecialInput & { count: number })
}

export type Tree = {
  [key: string]: { __levaInput: true; valueKey: string; path: string } | Tree
}

export type LevaInputProps<V, InternalSettings = {}> = {
  label: string
  displayValue: any
  value: V
  onChange: React.Dispatch<any>
  onUpdate: (v: any | ((_v: any) => any)) => void
  settings: InternalSettings
}

export type Plugin<Value, InternalValue, Settings, InternalSettings> = {
  schema: (value: any, settings?: Settings) => boolean
  component: React.ComponentType<LevaInputProps<InternalValue, InternalSettings>>
  format?: (value: any, settings: InternalSettings) => any
  validate?: (value: any, settings: InternalSettings) => boolean
  sanitize?: (value: any, settings: InternalSettings) => InternalValue
  normalize?: (input: ValueInputWithSettings<Value, Settings>) => { value: InternalValue; settings?: InternalSettings }
}
