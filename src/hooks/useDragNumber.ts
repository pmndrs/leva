import { useDrag } from './useDrag'
import { LevaInputProps } from '../types/'
import { InternalNumberSettings, sanitizeStep } from '../components/Number/number-plugin'

type UseDragNumberProps = {
  settings: InternalNumberSettings
  onDrag: LevaInputProps<number>['onUpdate']
}

const PRECISION = 100

export function useDragNumber({ settings, onDrag }: UseDragNumberProps) {
  const { step } = settings
  return useDrag(({ delta: [dx], movement: [, y] }) => {
    const _step = y < -PRECISION ? 2 * step : y > PRECISION ? step / 2 : step
    onDrag((v: number) => sanitizeStep(v + Math.round(dx) * _step, settings))
  })
}
