import React from 'react'
import { ControlInput } from './ControlInput'
import { log, LevaErrors } from '../../utils/log'
import { Plugins } from '../../plugin'
import { Button } from '../Button'
import { Monitor } from '../Monitor'
import { useInput } from '../../utils/hooks'
import { SpecialInputTypes } from '../../types'

type ControlProps = { path: string }

const specialComponents = {
  [SpecialInputTypes.BUTTON]: Button,
  [SpecialInputTypes.MONITOR]: Monitor,
}

export const Control = React.memo(({ path }: ControlProps) => {
  const [input, set] = useInput(path)

  const { type, label, ...props } = input

  if (type in SpecialInputTypes) {
    // @ts-expect-error
    const SpecialInputForType = specialComponents[type]
    return <SpecialInputForType label={label} path={path} {...props} />
  }

  if (!(type in Plugins)) {
    log(LevaErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  // @ts-expect-error
  return <ControlInput type={type} label={label} path={path} {...props} setValue={set} />
})
