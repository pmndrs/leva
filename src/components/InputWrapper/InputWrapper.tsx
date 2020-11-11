import React from 'react'
import { Number, String } from '../Text'
import { Boolean } from '../Boolean'
import { Button } from '../Button'
import { store, useInput } from '../../store'

import { SpecialInputTypes, ValueInputTypes } from '../../types'

import styles from './inputWrapper.module.css'

const Inputs = {
  [ValueInputTypes.STRING]: String,
  [ValueInputTypes.NUMBER]: Number,
  [ValueInputTypes.BOOLEAN]: Boolean,
  [SpecialInputTypes.BUTTON]: Button,
  [SpecialInputTypes.SEPARATOR]: String,
  [SpecialInputTypes.MONITOR]: String,
}

type InputWrapperProps = {
  valueKey: string
  path: string
}

// TODO we can probably do better than this
export function InputWrapper({ valueKey, path }: InputWrapperProps) {
  const { type, ...props } = useInput(path)

  if (type in SpecialInputTypes) {
    const SpecialInputForType = Inputs[type]
    // @ts-expect-error
    return <SpecialInputForType {...props} />
  }

  return <InputValueWrapper type={type} valueKey={valueKey} path={path} {...props} />
}

type InputValueWrapperProps = InputWrapperProps & { type: string }

function InputValueWrapper({ valueKey, path, type, ...props }: InputValueWrapperProps) {
  const onUpdate = (value: string | number) => store.setValueAtPath(path, value)

  // @ts-expect-error
  const InputForType = Inputs[type]

  return (
    <div className={styles.container}>
      <div className={styles.key}>{valueKey}</div>

      <div className={styles.inputs}>
        <InputForType {...props} onUpdate={onUpdate} />
      </div>
    </div>
  )
}
