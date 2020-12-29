import { SpecialInputTypes, MonitorInput } from '../types'

const defaultSettings = { graph: false, interval: 100 }

export function monitor(
  objectOrFn: React.MutableRefObject<any> | Function,
  settings?: Partial<MonitorInput['settings']>
): MonitorInput {
  return { type: SpecialInputTypes.MONITOR, objectOrFn, settings: { ...defaultSettings, ...settings } }
}
