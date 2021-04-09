import { useInputContext } from '../context'
import { useDrag as useDragHook } from 'react-use-gesture'
import { FullGestureState, UseDragConfig } from 'react-use-gesture/dist/types'

export function useDrag(handler: (state: FullGestureState<'drag'>) => any, config?: UseDragConfig) {
  const { onChangeStart, onChangeEnd, value } = useInputContext()
  return useDragHook((state) => {
    if (state.first) {
      document.body.classList.add('leva__panel__dragged')
      onChangeStart?.(value)
    }
    const result = handler(state)
    if (state.last) {
      document.body.classList.remove('leva__panel__dragged')
      onChangeEnd?.(value)
    }
    return result
  }, config)
}
