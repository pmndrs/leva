import { warn, TwixErrors } from './log'
import { schema as number } from '../components/Number'
import { schema as color } from '../components/Color'
import { schema as string } from '../components/String'
import { schema as boolean } from '../components/Boolean'
import { schema as point3d } from '../components/Point3d'
import { schema as point2d } from '../components/Point2d'
import { schema as spring } from '../components/Spring'

const checkers = [number, color, string, boolean, point3d, point2d, spring]

export function getValueType(value: any, path: string) {
  for (let checker of checkers) {
    const type = checker(value)
    if (type) return type
  }
  warn(TwixErrors.UNKNOWN_INPUT, path, value)
  return undefined
}
