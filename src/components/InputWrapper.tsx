import React from 'react'
import { Number, String } from './Text'
import { Boolean } from './Boolean'
import { setValueForPath, useValueType } from '../store'

const Inputs = {
  string: String,
  number: Number,
  boolean: Boolean,
}

type InputWrapperProps = {
  valueKey: string
  path: string
}

export default function InputWrapper({ valueKey, path }: InputWrapperProps) {
  const { value, settings, type } = useValueType(path)
  const onUpdate = (value: string | number) => setValueForPath(path, value)
  // @ts-expect-error
  const InputForType = Inputs[type]
  return (
    <div>
      {valueKey}:&nbsp;
      <InputForType value={value} {...settings} onUpdate={onUpdate} />
    </div>
  )
}
