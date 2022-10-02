import { useInputContext } from '../context'
import { FullGestureState, useWheel as useWheelHook, UserWheelConfig } from '@use-gesture/react'

export function useWheel(handler: (state: FullGestureState<'wheel'>) => any, config?: UserWheelConfig) {
  const { emitOnEditStart, emitOnEditEnd } = useInputContext()
  return useWheelHook((state) => {
    if (state.first) {
      document.body.classList.add('leva__panel__dragged')
      emitOnEditStart?.()
    }
    const result = handler(state)
    if (state.last) {
      document.body.classList.remove('leva__panel__dragged')
      emitOnEditEnd?.()
    }
    return result
  }, config)
}
