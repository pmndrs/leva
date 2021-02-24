import { useMemo } from 'react'
import { Store } from './store'

export function useCreateStore() {
  return useMemo(() => new Store(), [])
}
