import { SpecialInputTypes, MonitorInput, MonitorSettings } from '../types/'

const defaultSettings = { graph: false, interval: 100 }

export function monitor(
  objectOrFn: React.MutableRefObject<any> | Function,
  settings?: Partial<MonitorSettings>
): MonitorInput {
  return { type: SpecialInputTypes.MONITOR, objectOrFn, settings: { ...defaultSettings, ...settings } }
}
