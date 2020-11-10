export type Value = number | string | boolean

export type NumberSettings = { min: number; max: number; step: number }
export type StringSettings = never
export type BooleanSettings = never

// TODO Support folders settings
export type FolderSettings = {
  name: string
  collapsed?: boolean
}

export type Settings<T extends Value = Value> = T extends number
  ? NumberSettings
  : T extends string
  ? StringSettings
  : T extends boolean
  ? BooleanSettings
  : never

export type Input<T extends Value = Value> = Value | ({ value: T } & Settings<T>)

export type DataInput<T extends Value = Value> = {
  value: T
  settings?: Settings<T>
  count: number
  type: string
}

export type Data = {
  [key: string]: DataInput
}

// const SpecialTypes = { SEPARATOR: 0, FOLDER: 1, BUTTON: 2, MONITOR: 3 };
