/**
 * Headless version of useControls
 * Automatically passes { headless: true } to prevent UI rendering
 */

import { useMemo } from 'react'
import {
  useControls as useControlsBase,
  parseArgs,
  type HookSettings,
  type SchemaOrFn,
  type HookReturnType,
} from '../useControls'
import type { Schema, FolderSettings } from '../types'
import { reconstructArgsWithHeadless } from './useControls.utils'

/**
 * Headless version of useControls that manages state without rendering UI.
 *
 * This hook provides the same functionality as the standard useControls,
 * but automatically injects { headless: true } to prevent the default
 * Leva panel from rendering. This is useful for building custom UIs,
 * WebXR interfaces, or any scenario where you want Leva's state management
 * without the default HTML controls.
 *
 * @see {@link https://github.com/pmndrs/leva#headless-mode | Headless Mode Documentation}
 * @see useControls from 'leva' for full API documentation and examples
 *
 * @example
 * ```tsx
 * import { useControls } from 'leva/headless'
 *
 * function MyComponent() {
 *   const values = useControls({ x: 1, y: 2 })
 *   // Leva panel won't render, but state is still managed
 *   return <div>{values.x}, {values.y}</div>
 * }
 * ```
 */
export function useControls<S extends Schema, F extends SchemaOrFn<S> | string, G extends SchemaOrFn<S>>(
  schemaOrFolderName: F,
  settingsOrDepsOrSchema?: HookSettings | React.DependencyList | G,
  depsOrSettingsOrFolderSettings?: React.DependencyList | HookSettings | FolderSettings,
  depsOrSettings?: React.DependencyList | HookSettings,
  depsOrUndefined?: React.DependencyList
): HookReturnType<F, G> {
  // Parse arguments to understand structure
  const { folderName, hookSettings } = useMemo(
    () =>
      parseArgs(
        schemaOrFolderName,
        settingsOrDepsOrSchema,
        depsOrSettingsOrFolderSettings,
        depsOrSettings,
        depsOrUndefined
      ),
    [schemaOrFolderName, settingsOrDepsOrSchema, depsOrSettingsOrFolderSettings, depsOrSettings, depsOrUndefined]
  )

  // Reconstruct arguments with modified settings, ensuring single unconditional hook call
  // Always inject headless: true into hook settings
  const modifiedArgs = useMemo<Parameters<typeof useControlsBase>>(
    () =>
      reconstructArgsWithHeadless({
        folderName,
        schemaOrFolderName,
        settingsOrDepsOrSchema,
        depsOrSettingsOrFolderSettings,
        depsOrSettings,
        depsOrUndefined,
        hookSettings,
      }),
    [
      folderName,
      schemaOrFolderName,
      settingsOrDepsOrSchema,
      depsOrSettingsOrFolderSettings,
      depsOrSettings,
      depsOrUndefined,
      hookSettings,
    ]
  )

  return useControlsBase(...modifiedArgs) as HookReturnType<F, G>
}
