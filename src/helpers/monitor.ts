import { SpecialInputTypes, MonitorInput } from '../types'

export function monitor(objectOrFn: React.MutableRefObject<any> | Function, settings = { graph: false }): MonitorInput {
  return { type: SpecialInputTypes.MONITOR, objectOrFn, settings }
}
