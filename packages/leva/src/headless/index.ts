/**
 * Headless exports for Leva
 *
 * This module provides access to Leva's state management and hooks
 * without the default HTML UI, enabling custom UI implementations
 * (e.g., for WebXR, React Three Fiber, etc.)
 */

// Export headless version of useControls
export { useControls } from './useControls'

// Store and store management
export { levaStore, useCreateStore } from '../store'

// Hooks for accessing store data
export { useInput } from '../hooks/useInput'
export { useVisiblePaths } from '../hooks/useVisiblePaths'
export { useValuesForPath } from '../hooks/useValuesForPath'

// Context providers for custom stores
export { useStoreContext, LevaStoreProvider } from '../context'

// Tree utilities for rendering folder hierarchies
export { buildTree, isInput } from '../components/Leva/tree'

// Helper functions (folder, button, monitor, etc.)
export * from '../helpers'

// Plugin system for custom inputs
export { createPlugin } from '../plugin'

// Convenience hooks for easier headless usage
export { useLevaInputs, useLevaTree, useLevaInput } from './hooks'

// Type exports for building custom UIs
export type { StoreType, DataInput, DataItem, Data, Tree, MappedPaths } from '../types/internal'

export type {
  Schema,
  SchemaToValues,
  LevaInputs,
  SpecialInputs,
  Plugin,
  LevaInputProps,
  OnChangeHandler,
  FolderSettings,
  NumberSettings,
  Vector2d,
  Vector3d,
  Vector2dSettings,
  Vector3dSettings,
  ButtonInput,
  MonitorInput,
  CustomInput,
} from '../types/public'
