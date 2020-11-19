import React, { useCallback } from 'react'
import { Number } from '../Number'
import { String } from '../String'
import { Boolean } from '../Boolean'
import { Button } from '../Button'
import { Color } from '../Color'

import { store, useInput } from '../../store'

import { SpecialInputTypes, Value, ValueInputTypes } from '../../types'

import styles from './inputWrapper.module.css'
import { log, TwixErrors } from '../../utils/log'

const Inputs = {
  [ValueInputTypes.STRING]: String,
  [ValueInputTypes.NUMBER]: Number,
  [ValueInputTypes.BOOLEAN]: Boolean,
  [ValueInputTypes.COLOR]: Color,
  [SpecialInputTypes.BUTTON]: Button,
}

type InputWrapperProps = {
  valueKey: string
  path: string
}

// TODO we can probably do better than this
export function InputWrapper({ valueKey, path }: InputWrapperProps) {
  const { type, ...props } = useInput(path)

  if (type in SpecialInputTypes) {
    // @ts-expect-error
    const SpecialInputForType = Inputs[type]
    return <SpecialInputForType {...props} />
  }

  return <InputValueWrapper type={type} valueKey={valueKey} path={path} {...props} />
}

type InputValueWrapperProps = InputWrapperProps & { type: string }

function InputValueWrapper({ valueKey, path, type, ...props }: InputValueWrapperProps) {
  const onUpdate = useCallback((value: Value) => store.setValueAtPath(path, value), [path])
  // @ts-expect-error
  const InputForType = Inputs[type]

  if (!InputForType) {
    log(TwixErrors.UNSUPPORTED_INPUT, type, path)
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.key}>{valueKey}</div>

      <div className={styles.inputs}>
        <InputForType {...props} onUpdate={onUpdate} />
      </div>
    </div>
  )
}
