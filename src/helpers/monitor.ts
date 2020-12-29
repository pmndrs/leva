import { SpecialInputTypes, MonitorInput } from '../types'

export function monitor(objectOrFn: React.MutableRefObject<any> | Fn): MonitorInput {
  return { type: SpecialInputTypes.MONITOR, objectOrFn }
}
