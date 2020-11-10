import React from 'react'

type ButtonProps = {
  name: string
  onClick: () => any
}

export function Button({ name, onClick }: ButtonProps) {
  return <button onClick={() => onClick()}>{name}</button>
}
