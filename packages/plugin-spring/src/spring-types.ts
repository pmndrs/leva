import { InputWithSettings, NumberSettings, LevaInputProps } from 'leva/plugins'
import { InternalVectorSettings } from 'leva/utilities'

export type Spring = { tension?: number; friction?: number; mass?: number }
export type InternalSpring = { tension: number; friction: number; mass: number }
export type SpringSettings = { [key in keyof Spring]?: NumberSettings }

export type SpringInput = Spring | InputWithSettings<Spring, SpringSettings>

export type InternalSpringSettings = InternalVectorSettings<keyof InternalSpring, (keyof InternalSpring)[], 'object'>

export type SpringProps = LevaInputProps<InternalSpring, InternalSpringSettings, InternalSpring>
