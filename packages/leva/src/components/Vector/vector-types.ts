import { NumberSettings } from '../../types'
import { InternalNumberSettings } from '../Number/number-types'

export type Format = 'array' | 'object'

export type VectorType<K extends string = string, F extends Format = Format> = F extends 'object'
  ? { [key in K]: number }
  : number[]

export type GetKeys<V> = V extends Record<infer K, number> ? K : never

export type VectorObjectSettings<V extends VectorType, K extends string> = GetKeys<V> extends never
  ? K extends never
    ? never
    : { [key in K]: NumberSettings }
  : { [key in GetKeys<V>]: NumberSettings }

export type VectorSettings<V extends VectorType, K extends string> = (NumberSettings | VectorObjectSettings<V, K>) & {
  lock?: boolean
}

export type InternalVectorSettings<K extends string = string, Keys extends K[] = K[], F extends Format = Format> = {
  [key in K]: InternalNumberSettings
} & { keys: Keys; format: F; lock: boolean; locked: boolean }

export type CoordinateValue = Record<string, number>

export type CoordinateProps<T extends CoordinateValue> = {
  id?: string
  hideLabel?: boolean
  value: T
  settings: InternalNumberSettings
  valueKey: keyof T
  onUpdate: (value: any) => void
}

export type VectorProps<T extends CoordinateValue> = {
  value: T
  settings: { [key in keyof T]: InternalNumberSettings } & { lock?: boolean; locked?: boolean }
  onUpdate: (value: T) => void
  hideNumberLabels?: boolean
}
