import type { UseStore } from 'zustand'
import type { SpecialInput, RenderFn, FolderSettings, Plugin } from './public'

export type State = { data: Data }

export type MappedPaths = Record<string, { path: string; onChange: (value: any) => void }>

export type StoreType = {
  useStore: UseStore<State>
  storeId: string
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

export type CommonOptions = {
  key: string
  label: string | JSX.Element
  hint?: string
  render?: RenderFn
}

export type DataInputOptions = CommonOptions & {
  optional: boolean
  disabled: boolean
  onChange?: (value: unknown) => void
}

export type DataInput = {
  __refCount: number
  type: string
  value: unknown
  settings?: object
} & DataInputOptions

export type DataItem = DataInput | (SpecialInput & CommonOptions & { __refCount: number })

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
