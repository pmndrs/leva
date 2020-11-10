export type Value = number | string

export type SettingsNumber = { min: number; max: number; step: number }
export type SettingsString = never

export type Settings<T extends Value = Value> = T extends number
  ? SettingsNumber
  : T extends string
  ? SettingsString
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
