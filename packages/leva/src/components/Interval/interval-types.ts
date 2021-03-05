import { LevaInputProps, IntervalInput } from '../../types'
import { InternalNumberSettings } from '../Number/number-types'

export type Interval = IntervalInput['value']
export type InternalInterval = { min: number; max: number }

export type InternalIntervalSettings = {
  bounds: [number, number]
  min: InternalNumberSettings
  max: InternalNumberSettings
}

export type IntervalProps = LevaInputProps<Interval, InternalIntervalSettings, InternalInterval>

export type IntervalSliderProps = {
  value: InternalInterval
  onDrag: (v: Partial<InternalInterval>) => void
} & InternalIntervalSettings
