import React from 'react'
import { Number, String } from '../Text'
import { Boolean } from '../Boolean'
import { store, useInput } from '../../store'

import styles from './inputWrapper.module.css'

const Inputs = {
  string: String,
  number: Number,
  boolean: Boolean,
}

type InputWrapperProps = {
  valueKey: string
  path: string
}

export function InputWrapper({ valueKey, path }: InputWrapperProps) {
  const { value, settings, type } = useInput(path)
  const onUpdate = (value: string | number) => store.setValueAtPath(path, value)

  // @ts-expect-error
  const InputForType = Inputs[type]

  return (
    <div className={styles.container}>
      <div className={styles.key}>{valueKey}</div>

      <div className={styles.inputs}>
        <InputForType id={valueKey} value={value} {...settings} onUpdate={onUpdate} />
      </div>
    </div>
  )
}
