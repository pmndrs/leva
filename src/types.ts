export enum SpecialInputTypes {
  SEPARATOR = 'SEPARATOR',
  BUTTON = 'BUTTON',
  MONITOR = 'MONITOR',
}

export type Folders = Record<string, FolderSettings>

export type FolderSettings = {
  collapsed?: boolean
}

export type ValueInputWithSettings<V extends unknown, Settings extends object = {}> = {
  value: V
} & Settings

export type ValueInput<V, Settings extends object = {}> = V | ValueInputWithSettings<V, Settings>

export type DataInput = {
  type: string
  value: unknown
  settings?: object
  count?: number
}

export type ButtonInput = {
  type: SpecialInputTypes
  name: string
  onClick: () => any
}

export type SeparatorInput = {
  type: SpecialInputTypes
}

export type SpecialInputs = ButtonInput | SeparatorInput

export type Data = {
  [key: string]: DataInput | (SpecialInputs & { count?: number })
}

export type Tree = {
  [key: string]: JSX.Element | Tree
}

export type V8N = { test: (o: any) => boolean }

export type TwixInputProps<V, Settings extends object = {}> = {
  label: string
  displayValue: any
  value: V
  onChange: React.Dispatch<any>
  onUpdate: (value: any) => void
  settings?: Settings
}

export type Plugin<V, Settings extends object = {}> = {
  schema: (value: any) => boolean
  component: React.ComponentType<TwixInputProps<V, Settings>>
  format?: (value: any, settings?: Settings) => any
  validate?: (value: any, settings?: Settings) => boolean
  sanitize?: (value: any, settings?: Settings) => V
  normalize?: (value: V, settings: Settings) => { value: V; settings: Settings }
}
