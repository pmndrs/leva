import React from 'react'
import { useInput } from '../../store'
import { TwixValueInput } from './TwixInputValue'
import allInputs from './allInputs'
import { log, TwixErrors } from '../../utils/log'

import { SpecialInputTypes } from '../../types'

type TwixWrapperProps = { valueKey: string; path: string }

// TODO we can probably do better than this
export function TwixWrapper({ valueKey, path }: TwixWrapperProps) {
  const { type, ...props } = useInput(path)

  if (type in SpecialInputTypes) {
    // @ts-expect-error
    const SpecialInputForType = allInputs[type]
    return <SpecialInputForType {...props} />
  }

  // @ts-expect-error
  const Input = allInputs[type]

  if (!Input) {
    log(TwixErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }
  // @ts-expect-error
  return <TwixValueInput as={Input} type={type} valueKey={valueKey} path={path} {...props} />
}
