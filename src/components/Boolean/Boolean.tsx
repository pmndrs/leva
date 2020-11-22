import React from 'react'
import { TwixInputProps } from '../../types'

export function Boolean({ label, value, onUpdate }: TwixInputProps<boolean>) {
  return (
    <>
      <label>{label}</label>
      <input type="checkbox" checked={value} onChange={e => onUpdate(e.target.checked)} />
    </>
  )
}
