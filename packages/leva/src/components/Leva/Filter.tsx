import React, { useMemo, useState, useEffect, useRef } from 'react'
import { debounce } from '../../utils'
import { StyledFilter } from './StyledLeva'

type FilterProps = { onChange: (value: string) => void }

export function Filter({ onChange }: FilterProps) {
  const [value, set] = useState('')
  const debouncedOnChange = useMemo<FilterProps['onChange']>(() => debounce(onChange, 250), [onChange])
  const inputRef = useRef<HTMLInputElement>(null)

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value
    set(v)
    debouncedOnChange(v)
  }

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === 'L' && event.shiftKey && event.metaKey) {
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <StyledFilter>
      <input ref={inputRef} value={value} placeholder="Press CMD+SHIFT+L to filter" onChange={_onChange} />
    </StyledFilter>
  )
}
