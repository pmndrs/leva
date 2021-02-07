import React, { useCallback } from 'react'
import { ControlInput } from './ControlInput'
import { log, LevaErrors } from '../../utils/log'
import { Plugins } from '../../plugin'
import { Button } from '../Button'
import { Monitor } from '../Monitor'
import { useStoreContext } from '../../context'
import { useInput } from '../../utils/hooks'
import { SpecialInputTypes } from '../../types'

type ControlProps = { valueKey: string; path: string }

const specialComponents = {
  [SpecialInputTypes.BUTTON]: Button,
  [SpecialInputTypes.MONITOR]: Monitor,
}

export const Control = React.memo(({ valueKey, path }: ControlProps) => {
  const store = useStoreContext()
  const { type, ...props } = useInput(store, path)

  const set = useCallback((value) => store.setValueAtPath(path, value), [path, store])

  if (type in SpecialInputTypes) {
    // @ts-expect-error
    const SpecialInputForType = specialComponents[type]
    return <SpecialInputForType valueKey={valueKey} path={path} {...props} />
  }

  if (!(type in Plugins)) {
    log(LevaErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  // @ts-expect-error
  return <ControlInput type={type} valueKey={valueKey} path={path} {...props} setValue={set} />
})
