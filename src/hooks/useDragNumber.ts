import { useDrag } from './useDrag'
import { LevaInputProps } from '../types'

type UseDragNumberProps = {
  step?: number
  onDrag: LevaInputProps<number>['onUpdate']
}

const PRECISION = 100

export function useDragNumber({ step = 1, onDrag }: UseDragNumberProps) {
  return useDrag(({ delta: [dx], movement: [, y] }) => {
    const _step = y < -PRECISION ? 2 * step : y > PRECISION ? step / 2 : step
    onDrag((v: number) => v + Math.round(dx) * _step)
  })
}
