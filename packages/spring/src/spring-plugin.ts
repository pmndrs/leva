import { InputWithSettings, NumberSettings, InternalNumberSettings } from '@leva/leva/plugins'
import { normalizePoint } from '@leva/leva/utilities'

export type Spring = { tension: number; friction: number; mass?: number }
export type SpringSettings = { [key in keyof Spring]?: NumberSettings }

type SpringInput = InputWithSettings<Spring, SpringSettings>

export type InternalSpring = { tension: number; friction: number; mass: number }
export type InternalSpringSettings = { [key in keyof InternalSpring]: InternalNumberSettings }

const defaultTensionSettings = { min: 1 }
const defaultFrictionSettings = { min: 1 }
const defaultMassSettings = { min: 0.1 }

export const normalize = ({ value, ..._settings }: SpringInput) => {
  _settings = _settings || {}
  const settings = {
    tension: { ...defaultTensionSettings, ..._settings.tension },
    friction: { ...defaultFrictionSettings, ..._settings.friction },
    mass: { ...defaultMassSettings, ..._settings.mass },
  }
  return normalizePoint({ mass: 1, ...value }, settings, ['tension', 'friction', 'mass'])
}
