import type { UseStore } from 'zustand'
import type { SpecialInput, RenderFn, FolderSettings, Plugin } from './public'

export type State = { data: Data }

export type MappedPaths = Record<string, { path: string; onChange: (value: any) => void }>

export type StoreType = {
  useStore: UseStore<State>
  orderPaths: (paths: string[]) => string[]
  setOrderedPaths: (newPaths: string[]) => void
  disposePaths: (paths: string[]) => void
  dispose: () => void
  getVisiblePaths: () => string[]
  getFolderSettings: (path: string) => FolderSettings
  getData: () => Data
  addData: (newData: Data, override: boolean) => void
  setValueAtPath: (path: string, value: any) => void
  setSettingsAtPath: (path: string, settings: any) => void
  disableInputAtPath: (path: string, flag: boolean) => void
  // TODO possibly better type this
  set: (values: Record<string, any>) => void
  get: (path: string) => any
  getDataFromSchema: (schema: any) => [Data, MappedPaths]
}

type Decorators = {
  __refCount: number
  key: string
  label: string | JSX.Element
  hint?: string
  render?: RenderFn
}

export type DataInput = {
  type: string
  value: unknown
  optional: boolean
  disabled: boolean
  onChange?: (value: unknown) => void
  settings?: object
} & Decorators

export type DataItem = DataInput | (SpecialInput & Decorators)

export type Data = Record<string, DataItem>

export type Tree = {
  [key: string]: { __levaInput: true; path: string } | Tree
}

/**
 * Internal plugin type including schema.
 * @internal
 */
export interface InternalPlugin<Input, Value = Input, Settings = {}, InternalSettings = {}>
  extends Plugin<Input, Value, InternalSettings> {
  schema: (value: any, settings?: Settings) => boolean
}

export type PanelSettingsType = {
  hideCopyButton: boolean
}
