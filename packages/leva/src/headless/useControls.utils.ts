/**
 * Utilities for headless useControls argument reconstruction
 */

import type { HookSettings, SchemaOrFn } from '../useControls'
import type { Schema, FolderSettings } from '../types'
import type { useControls as UseControlsType } from '../useControls'

/**
 * Helper to check if a value is HookSettings
 * Accepts any non-null, non-array object to distinguish from dependency arrays
 */
export function isHookSettings(value: any): value is HookSettings {
  return typeof value === 'object' && !Array.isArray(value) && value !== null
}

/**
 * Creates headless settings by merging existing hookSettings with headless: true
 */
export function createHeadlessSettings(hookSettings?: HookSettings): HookSettings {
  return { ...hookSettings, headless: true }
}

/**
 * Reconstructs arguments for useControlsBase with headless: true always injected
 */
export function reconstructArgsWithHeadless<
  S extends Schema,
  F extends SchemaOrFn<S> | string,
  G extends SchemaOrFn<S>
>(params: {
  folderName: string | undefined
  schemaOrFolderName: F
  settingsOrDepsOrSchema?: HookSettings | React.DependencyList | G
  depsOrSettingsOrFolderSettings?: React.DependencyList | HookSettings | FolderSettings
  depsOrSettings?: React.DependencyList | HookSettings
  depsOrUndefined?: React.DependencyList
  hookSettings?: HookSettings
}): Parameters<typeof UseControlsType> {
  const {
    folderName,
    schemaOrFolderName,
    settingsOrDepsOrSchema,
    depsOrSettingsOrFolderSettings,
    depsOrSettings,
    depsOrUndefined,
    hookSettings,
  } = params

  const headlessSettings = createHeadlessSettings(hookSettings)

  if (folderName) {
    // Folder case: useControls(folderName, schema, folderSettings?, hookSettings?, deps?)
    const folderSettingsArg = depsOrSettingsOrFolderSettings as FolderSettings | undefined

    // Determine if depsOrSettings is HookSettings or deps array
    if (isHookSettings(depsOrSettings)) {
      // It's HookSettings - use headlessSettings and depsOrUndefined as deps
      return [
        schemaOrFolderName as string,
        settingsOrDepsOrSchema as G,
        folderSettingsArg,
        headlessSettings,
        depsOrUndefined,
      ]
    } else {
      // It's deps array - inject headlessSettings before it
      return [
        schemaOrFolderName as string,
        settingsOrDepsOrSchema as G,
        folderSettingsArg,
        headlessSettings,
        depsOrSettings as React.DependencyList | undefined,
      ]
    }
  } else {
    // Schema-only case: useControls(schema, hookSettings?, deps?)
    // Determine if settingsOrDepsOrSchema is HookSettings or deps array
    if (isHookSettings(settingsOrDepsOrSchema)) {
      // It's HookSettings - use headlessSettings and depsOrSettingsOrFolderSettings as deps
      return [
        schemaOrFolderName as F & SchemaOrFn,
        headlessSettings,
        depsOrSettingsOrFolderSettings as React.DependencyList | undefined,
      ]
    } else {
      // It's deps array - inject headlessSettings before it
      return [
        schemaOrFolderName as F & SchemaOrFn,
        headlessSettings,
        settingsOrDepsOrSchema as React.DependencyList | undefined,
      ]
    }
  }
}
