import React, { useCallback } from 'react'
import styled from '@xstyled/styled-components'
import { useTwixUpdate } from '../../hooks/useTwixUpdate'
import { store } from '../../store'

import { TwixInputProps } from '../../types'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  column-gap: 10px;
  padding: 2px 4px;
  background-color: background;

  & > label {
    font-weight: 600;
  }
`

type TwixValueInputProps<V, Settings extends object> = {
  as: React.ComponentType<TwixInputProps<V, Settings>>
  valueKey: string
  path: string
  type: string
  value: V
  settings: Settings
}

export function TwixValueInput<V, Settings extends object>({
  as: Input,
  valueKey,
  path,
  type,
  value,
  settings,
}: TwixValueInputProps<V, Settings>) {
  const set = useCallback(value => store.setValueAtPath(path, value), [path])

  const { formattedValue, onChange, onUpdate, settings: s } = useTwixUpdate({ type, value, settings, set })

  return (
    <Container>
      <Input
        label={valueKey}
        formattedValue={formattedValue}
        value={value}
        onChange={onChange}
        onUpdate={onUpdate}
        settings={s}
      />
    </Container>
  )
}
