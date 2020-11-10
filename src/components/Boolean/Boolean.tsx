import React from 'react'

type BooleanProps = {
  value: boolean
  onUpdate: (value: boolean) => void
}

export function Boolean({ value, onUpdate }: BooleanProps) {
  return <input type="checkbox" checked={value} onChange={e => onUpdate(e.target.checked)} />
}
