import React from 'react'
import { TwixInputProps } from '../../types'
import { Label, Row } from '../styles'

export function Boolean({ label, value, onUpdate }: TwixInputProps<boolean>) {
  return (
    <Row grid>
      <Label>{label}</Label>
      <input type="checkbox" checked={value} onChange={e => onUpdate(e.target.checked)} />
    </Row>
  )
}
