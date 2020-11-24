import { useDrag } from 'react-use-gesture'

type UseDragNumberProps = {
  value: number
  step?: number
  onDrag: (v: number) => void
}

export function useDragNumber({ value, step = 1, onDrag }: UseDragNumberProps) {
  return useDrag(
    ({ movement: [x], memo = value }) => {
      onDrag(memo + Math.round(x) * step!)
      return memo
    },
    { threshold: 10, axis: 'x' }
  )
}
