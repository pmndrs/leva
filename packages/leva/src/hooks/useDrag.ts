import { useInputContext } from '../context'
import { FullGestureState, useDrag as useDragHook, UserDragConfig } from '@use-gesture/react'

export function useDrag(handler: (state: FullGestureState<'drag'>) => any, config?: UserDragConfig) {
  const { emitOnEditStart, emitOnEditEnd } = useInputContext()
  return useDragHook((state) => {
    if (state.first) {
      document.body.classList.add('panel__dragged')
      emitOnEditStart()
    }
    const result = handler(state)
    if (state.last) {
      document.body.classList.remove('panel__dragged')
      emitOnEditEnd()
    }
    return result
  }, config)
}
