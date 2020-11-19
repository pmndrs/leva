export enum ValueInputTypes {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  POINT2D = 'POINT2D',
  POINT3D = 'POINT3D',
  SPRING = 'SPRING',
  COLOR = 'COLOR',
}

export enum SpecialInputTypes {
  SEPARATOR = 'SEPARATOR',
  BUTTON = 'BUTTON',
  MONITOR = 'MONITOR',
}

export type Point2d = { x: number; y: number } | [number, number]
export type Point3d = { x: number; y: number; z: number } | [number, number, number]
export type Spring = { tension: number; friction: number; mass?: number }
export type Color = { r: number; g: number; b: number; a?: number }

export type Value = number | string | boolean | Point2d | Point3d | Spring | Color

export type NumberSettings = { min?: number; max?: number; step?: number }
export type StringSettings = {}
export type BooleanSettings = {}
export type ColorSettings = {}

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
  : T extends Color
  ? ColorSettings
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

export type V8N = { test: (o: any) => boolean }
