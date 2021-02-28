import { useDrag } from './useDrag'
import { InternalNumberSettings } from '../components/Number/number-plugin'
import { LevaInputProps } from '../types'

type UseDragNumberProps = {
  settings: InternalNumberSettings
  onDrag: LevaInputProps<number>['onUpdate']
}

export const multiplyStep = (event: any) => (event.shiftKey ? 5 : event.altKey ? 1 / 5 : 1)

// this function should help with how the drag is handled
export function useDragNumber({ settings, onDrag }: UseDragNumberProps) {
  const { step } = settings
  return useDrag(({ delta: [dx], event, memo = 0 }) => {
    memo += dx / 2
    if (Math.abs(memo) >= 1) {
      onDrag((v: any) => parseFloat(v) + Math.floor(memo) * step * multiplyStep(event))
      memo = 0
    }
    return memo
  })
}
