export enum ValueInputTypes {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
}

export enum SpecialInputTypes {
  SEPARATOR = 'SEPARATOR',
  BUTTON = 'BUTTON',
  MONITOR = 'MONITOR',
}

export type Value = number | string | boolean

export type NumberSettings = { min: number; max: number; step: number }
export type StringSettings = {}
export type BooleanSettings = {}

export type Folders = Record<string, FolderSettings>

// TODO Support folders settings
export type FolderSettings = {
  collapsed?: boolean
}

export type Settings<T extends Value = Value> = T extends number
  ? NumberSettings
  : T extends string
  ? StringSettings
  : T extends boolean
  ? BooleanSettings
  : never

export type ValueInput<T extends Value = Value> = Value | ({ value: T } & Settings<T>)

export type DataInput<T extends Value = Value> = {
  type: ValueInputTypes
  value: T
  settings?: Settings<T>
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

type SpecialInputs = ButtonInput | SeparatorInput

export type Data = {
  [key: string]: DataInput | (SpecialInputs & { count?: number })
}

export type Tree = {
  [key: string]: JSX.Element | Tree
}
