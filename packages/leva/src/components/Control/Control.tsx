import React from 'react'
import { useInput } from '../../store'
import { ControlInput } from './ControlInput'
import { log, LevaErrors } from '../../utils/log'
import { SpecialInputTypes } from '../../types'
import { Plugins } from '../../plugin'
import { Button } from '../Button'
import { Monitor } from '../Monitor'

type ControlProps = { valueKey: string; path: string }

const specialComponents = {
  [SpecialInputTypes.BUTTON]: Button,
  [SpecialInputTypes.MONITOR]: Monitor,
}

// TODO we can probably do better than this
export function Control({ valueKey, path }: ControlProps) {
  const { type, ...props } = useInput(path)

  if (type in SpecialInputTypes) {
    // @ts-expect-error
    const SpecialInputForType = specialComponents[type]
    return <SpecialInputForType valueKey={valueKey} path={path} {...props} />
  }

  if (!(type in Plugins)) {
    log(LevaErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  const Input = Plugins[type].component

  // @ts-expect-error
  return <ControlInput as={Input} type={type} valueKey={valueKey} path={path} {...props} />
}
