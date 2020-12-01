import { useDrag as useDragHook } from 'react-use-gesture'
import { FullGestureState, UseDragConfig } from 'react-use-gesture/dist/types'

export const useDrag = (handler: (state: FullGestureState<'drag'>) => any, config?: UseDragConfig) => {
  return useDragHook(state => {
    if (state.first) document.body.classList.add('twix__body__dragged')
    else if (state.last) document.body.classList.remove('twix__body__dragged')
    return handler(state)
  }, config)
}
