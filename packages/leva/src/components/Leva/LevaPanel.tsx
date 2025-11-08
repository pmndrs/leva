import React from 'react'
import { useStoreContext } from '../../context'
import { LevaRoot, LevaRootProps } from './LevaRoot'

type LevaPanelProps = Partial<LevaRootProps>

/**
 * Functions the same as `<Leva />` but enables multiple unique panels with their own store.
 *
 * @example
 * const store1 = useCreateStore()
 * const store2 = useCreateStore()
 *
 * return (
 *   <>
 *     <LevaPanel store={store1} />
 *     <LevaPanel store={store2} />
 *   </>
 * )
 */
export function LevaPanel({ store, ...props }: LevaPanelProps) {
  const parentStore = useStoreContext()
  const _store = store === undefined ? parentStore : store
  return <LevaRoot store={_store} {...props} />
}
