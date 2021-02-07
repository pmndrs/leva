import { useDrag } from './useDrag'
import { LevaInputProps } from '../../types'
import { InternalNumberSettings, sanitizeStep } from '../../components/Number/number-plugin'
import { ceil } from '../../utils'

type UseDragNumberProps = {
  settings: InternalNumberSettings
  onDrag: LevaInputProps<number>['onUpdate']
}

export function useDragNumber({ settings, onDrag }: UseDragNumberProps) {
  const { step } = settings
  return useDrag(({ delta: [dx], shiftKey }) => {
    const _step = shiftKey ? step : step * 2
    onDrag((v: any) => sanitizeStep(parseFloat(v) + ceil(dx) * _step, settings))
  })
}
