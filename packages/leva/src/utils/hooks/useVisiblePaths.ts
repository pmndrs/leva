import { StoreType } from '../../store'
import shallow from 'zustand/shallow'

/**
 * Hook used by the root component to get all visible inputs.
 */
export const useVisiblePaths = (store: StoreType) => store.useStore((s) => store.getVisiblePaths(s.data), shallow)
