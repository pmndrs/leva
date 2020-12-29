export enum SpecialInputTypes {
  SEPARATOR = 'SEPARATOR',
  BUTTON = 'BUTTON',
  MONITOR = 'MONITOR',
  FOLDER = 'FOLDER',
}

export type Folders = Record<string, FolderSettings>

export type FolderSettings = {
  collapsed?: boolean
}

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
  type: SpecialInputTypes
  onClick: () => any
}

export type MonitorInput = {
  type: SpecialInputTypes
  objectOrFn: React.MutableRefObject<any> | Function
  settings: { graph: boolean }
}

export type SeparatorInput = {
  type: SpecialInputTypes
}

export type SpecialInputs = ButtonInput | SeparatorInput

export type Data = {
  [key: string]: DataInput | (SpecialInputs & { count: number })
}

export type Tree = {
  [key: string]: JSX.Element | Tree
}

export type V8N = { test: (o: any) => boolean }

export type TwixInputProps<V, InternalSettings = {}> = {
  label: string
  displayValue: any
  value: V
  onChange: React.Dispatch<any>
  onUpdate: (v: any | ((_v: any) => any)) => void
  settings: InternalSettings
}

export type Plugin<Value, InternalValue, Settings, InternalSettings> = {
  schema: (value: any, settings?: Settings) => boolean
  component: React.ComponentType<TwixInputProps<InternalValue, InternalSettings>>
  format?: (value: any, settings: InternalSettings) => any
  validate?: (value: any, settings: InternalSettings) => boolean
  sanitize?: (value: any, settings: InternalSettings) => InternalValue
  normalize?: (input: ValueInputWithSettings<Value, Settings>) => { value: InternalValue; settings: InternalSettings }
}
