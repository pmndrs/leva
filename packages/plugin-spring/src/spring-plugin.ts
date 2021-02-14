import { InputWithSettings, NumberSettings, InternalNumberSettings } from 'leva/plugins'
import { normalizeVector, sanitizeVector, Format } from 'leva/utilities'

export type Spring = { tension?: number; friction?: number; mass?: number }
export type SpringSettings = { [key in keyof Spring]?: NumberSettings }

type SpringInput = InputWithSettings<Spring | undefined, SpringSettings>

export type InternalSpring = { tension: number; friction: number; mass: number }
export type InternalSpringSettings = {
  [key in keyof InternalSpring]: InternalNumberSettings
} & { format: Format }

const defaultTensionSettings = { min: 1, step: 1 }
const defaultFrictionSettings = { min: 1, step: 0.5 }
const defaultMassSettings = { min: 0.1, step: 0.1 }
const defaultValue = { mass: 1, tension: 100, friction: 30 }

const keys = ['tension', 'friction', 'mass']

export const normalize = ({ value, ..._settings }: SpringInput) => {
  _settings = _settings || {}
  const settings = {
    tension: { ...defaultTensionSettings, ..._settings.tension },
    friction: { ...defaultFrictionSettings, ..._settings.friction },
    mass: { ...defaultMassSettings, ..._settings.mass },
  }

  return normalizeVector({ ...defaultValue, ...value }, settings, keys)
}

// TODO fix type any
export const sanitize = (value: any, settings: any) => sanitizeVector(value, settings, keys)
