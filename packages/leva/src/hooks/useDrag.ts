import { useDrag as useDragHook } from 'react-use-gesture'
import { FullGestureState, UseDragConfig } from 'react-use-gesture/dist/types'

export function useDrag(handler: (state: FullGestureState<'drag'>) => any, config?: UseDragConfig) {
  return useDragHook((state) => {
    if (state.first) document.body.classList.add('leva__panel__dragged')
    else if (state.last) document.body.classList.remove('leva__panel__dragged')
    return handler(state)
  }, config)
}
