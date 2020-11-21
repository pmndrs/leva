import React from 'react'
import { useInput } from '../../store'
import { TwixInput } from './TwixInput'
import allInputs from './allInputs'

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
  return <TwixInput type={type} valueKey={valueKey} path={path} {...props} />
}
