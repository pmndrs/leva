import shallow from 'zustand/shallow'
import { StoreType } from '../../store'

/**
 * Return all input (value and settings) properties at a given path.
 *
 * @param path
 */
export const useInput = (store: StoreType, path: string) =>
  store.useStore((s) => {
    const { count, ...input } = s.data[path]
    return input
  }, shallow)
