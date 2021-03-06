import React from 'react'
import { ControlInput } from './ControlInput'
import { log, LevaErrors } from '../../utils/log'
import { Plugins } from '../../plugin'
import { Button } from '../Button'
import { Monitor } from '../Monitor'
import { useInput } from '../../hooks'
import { SpecialInputTypes } from '../../types'

type ControlProps = { path: string }

const specialComponents = {
  [SpecialInputTypes.BUTTON]: Button,
  [SpecialInputTypes.MONITOR]: Monitor,
}

export const Control = React.memo(({ path }: ControlProps) => {
  const [input, { set, setSettings, disable }] = useInput(path)
  if (!input) return null

  const { type, label, key, ...inputProps } = input

  if (type in SpecialInputTypes) {
    // @ts-expect-error
    const SpecialInputForType = specialComponents[type]
    return <SpecialInputForType label={label} path={path} {...inputProps} />
  }

  if (!(type in Plugins)) {
    log(LevaErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  return (
    // @ts-expect-error
    <ControlInput
      type={type}
      label={label}
      path={path}
      valueKey={key}
      setValue={set}
      setSettings={setSettings}
      disable={disable}
      {...inputProps}
    />
  )
})
