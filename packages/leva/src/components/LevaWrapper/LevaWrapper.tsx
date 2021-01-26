import React from 'react'
import { useInput } from '../../store'
import { LevaValueInput } from './LevaValueInput'
import { log, LevaErrors } from '../../utils/log'
import { SpecialInputTypes } from '../../types/'
import { Plugins } from '../../plugins'
import { Button } from '../Button'
import { Monitor } from '../Monitor'

type LevaWrapperProps = { valueKey: string; path: string }

const specialComponents = {
  [SpecialInputTypes.BUTTON]: Button,
  [SpecialInputTypes.MONITOR]: Monitor,
}

// TODO we can probably do better than this
export function LevaWrapper({ valueKey, path }: LevaWrapperProps) {
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
  return <LevaValueInput as={Input} type={type} valueKey={valueKey} path={path} {...props} />
}
