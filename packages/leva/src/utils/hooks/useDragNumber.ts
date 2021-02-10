import { useDrag } from './useDrag'
import { InternalNumberSettings, sanitizeStep } from '../../components/Number/number-plugin'
import { ceil } from '../../utils'
import { LevaInputProps } from '../../types'

type UseDragNumberProps = {
  settings: InternalNumberSettings
  onDrag: LevaInputProps<number>['onUpdate']
}

export const multiplyStep = (event: any) => (event.shiftKey ? 5 : event.altKey ? 1 / 5 : 1)

export function useDragNumber({ settings, onDrag }: UseDragNumberProps) {
  const { step } = settings
  return useDrag(({ delta: [dx], event }) => {
    onDrag((v: any) => sanitizeStep(parseFloat(v) + ceil(dx) * step * multiplyStep(event), settings))
  })
}
