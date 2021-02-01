import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { debounce } from '../../utils'
import { FolderTitleProps } from '../Folder'
import { StyledFilterInput, StyledTitleWithFilter, Logo } from './StyledLeva'

type FilterProps = { setFilter: (value: string) => void }

function FilterInput({ setFilter }: FilterProps) {
  const [value, set] = useState('')
  const debouncedOnChange = useMemo<FilterProps['setFilter']>(() => debounce(setFilter, 250), [setFilter])
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
    <StyledFilterInput ref={inputRef} value={value} placeholder="Press CMD+SHIFT+L to filter" onChange={_onChange} />
  )
}

type TitleWithFilterProps = FilterProps &
  FolderTitleProps & {
    onDrag: (point: { x?: number | undefined; y?: number | undefined }) => void
  }

export function TitleWithFilter({ setFilter, onDrag, toggle }: TitleWithFilterProps) {
  const bind = useDrag(
    ({ tap, offset: [x, y] }) => {
      if (tap) toggle()
      else onDrag({ x, y })
    },
    { filterTaps: true }
  )

  return (
    <StyledTitleWithFilter>
      <FilterInput setFilter={setFilter} />
      <Logo {...bind()}>
        <svg viewBox="0 0 64 8" xmlns="http://www.w3.org/2000/svg">
          <defs />
          <path
            d="M7.5 7.4V5.6H2.3V0H0v7.4h7.5zm17.8 0V5.7h-5.6V4.5H25V2.8h-5.4V1.7h5.5V0h-7.8v7.4h7.9zm16 0L45 0h-2.5L40 5.5 37.2 0h-2.6l3.9 7.4h2.9zm13.5 0l.7-1.3H60l.7 1.3h2.5l-4-7.4h-3l-3.7 7.4h2.3zm4.4-3h-2.9l1.4-2.8 1.5 2.8z"
            fillRule="nonzero"
          />
        </svg>
      </Logo>
    </StyledTitleWithFilter>
  )
}
