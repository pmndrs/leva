import React, { useMemo, useState } from 'react'
import { debounce } from '../../utils'
import { StyledFilter } from './StyledLeva'

type FilterProps = { onChange: (value: string) => void }

export function Filter({ onChange }: FilterProps) {
  const [value, set] = useState('')
  const debouncedOnChange = useMemo<FilterProps['onChange']>(() => debounce(onChange, 250), [onChange])

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value
    set(v)
    debouncedOnChange(v)
  }

  return (
    <StyledFilter>
      <input value={value} placeholder="Press CMD+SHIFT+L to filter" onChange={_onChange} />
    </StyledFilter>
  )
}
