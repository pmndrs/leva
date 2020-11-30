import { useDrag } from 'react-use-gesture'

type UseDragNumberProps = {
  value: number
  step?: number
  onDrag: (v: number) => void
}

const PRECISION = 100

export function useDragNumber({ value, step = 1, onDrag }: UseDragNumberProps) {
  return useDrag(({ delta: [dx], movement: [, y], memo = value }) => {
    const _step = y < -PRECISION ? 2 * step : y > PRECISION ? step / 2 : step
    memo += Math.round(dx) * _step
    onDrag(memo)
    return memo
  })
}
