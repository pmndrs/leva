import { Store } from '../store'
import type { SpecialInput, RenderFn, Plugin, OnChangeHandler } from './public'

export type State = { data: Data }
export type LevaStore = Store

export type MappedPaths = Record<
  string,
  {
    path: string
    onChange?: OnChangeHandler
    onEditStart?: (...args: any) => void
    onEditEnd?: (...args: any) => void
    reactive: boolean
  }
>

export type CommonOptions = {
  key: string
  label: string | JSX.Element
  hint?: string
  render?: RenderFn
  order: number
}

export type DataInputOptions = CommonOptions & {
  optional: boolean
  disabled: boolean
}

export type PanelInputOptions = {
  onChange?: (...args: any) => void
  onEditStart?: (...args: any) => void
  onEditEnd?: (...args: any) => void
}

export type DataInput = {
  __refCount: number
  type: string
  value: unknown
  /**
   * Whether the onChange handler invocation is caused internally via the panel or  externally via a set call.
   */
  fromPanel: boolean
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
