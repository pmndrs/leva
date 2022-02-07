import { useInputContext } from '../context'
import { FullGestureState, useDrag as useDragHook, UserDragConfig } from '@use-gesture/react'

export function useDrag(handler: (state: FullGestureState<'drag'>) => any, config?: UserDragConfig) {
  const { emitOnEditStart, emitOnEditEnd } = useInputContext()
  return useDragHook((state) => {
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
