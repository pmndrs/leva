import { Number } from '../Number'
import { String } from '../String'
import { Boolean } from '../Boolean'
import { Button } from '../Button'
import { Color } from '../Color'

import { SpecialInputTypes, ValueInputTypes } from '../../types'

const allInputs = {
  [ValueInputTypes.STRING]: String,
  [ValueInputTypes.NUMBER]: Number,
  [ValueInputTypes.BOOLEAN]: Boolean,
  [ValueInputTypes.COLOR]: Color,
  [SpecialInputTypes.BUTTON]: Button,
}

export default allInputs
