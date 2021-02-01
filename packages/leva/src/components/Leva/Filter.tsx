import React, { useMemo, useState, useEffect, useRef, useImperativeHandle } from 'react'
import { useDrag } from 'react-use-gesture'
import { debounce } from '../../utils'
import { FolderTitleProps } from '../Folder'
import { StyledFilterInput, StyledTitleWithFilter, Drag, Icon, FilterWrapper } from './StyledLeva'

type FilterProps = { setFilter: (value: string) => void }

const FilterInput = React.forwardRef(({ setFilter }: FilterProps, ref) => {
  const [value, set] = useState('')
  const debouncedOnChange = useMemo<FilterProps['setFilter']>(() => debounce(setFilter, 250), [setFilter])
  const inputRef = useRef<HTMLInputElement>(null)

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value
    set(v)
    debouncedOnChange(v)
  }

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current!.focus(),
    blur: () => inputRef.current!.blur(),
  }))

  return (
    <StyledFilterInput
      ref={inputRef}
      value={value}
      placeholder="Press CMD+SHIFT+L to filter"
      onPointerDown={(e) => e.stopPropagation()}
      onChange={_onChange}
    />
  )
})

type TitleWithFilterProps = FilterProps &
  FolderTitleProps & {
    onDrag: (point: { x?: number | undefined; y?: number | undefined }) => void
  }

export function TitleWithFilter({ setFilter, onDrag, toggle, toggled }: TitleWithFilterProps) {
  const [filterShown, setShowFilter] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (filterShown) inputRef.current?.focus()
    else inputRef.current?.blur()
  }, [filterShown])

  const bind = useDrag(
    ({ tap, offset: [x, y] }) => {
      if (tap) toggle()
      else onDrag({ x, y })
    },
    { filterTaps: true }
  )

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === 'L' && event.shiftKey && event.metaKey) {
        setShowFilter((f) => !f)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <>
      <StyledTitleWithFilter {...bind()}>
        <Icon>
          <svg
            width="9"
            height="5"
            viewBox="0 0 9 5"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${toggled ? 0 : -90}deg)` }}>
            <path d="M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z" />
          </svg>
        </Icon>
        <Drag>
          <svg width="28" height="14" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2" cy="2" r="2" />
            <circle cx="14" cy="2" r="2" />
            <circle cx="26" cy="2" r="2" />
            <circle cx="2" cy="12" r="2" />
            <circle cx="14" cy="12" r="2" />
            <circle cx="26" cy="12" r="2" />
          </svg>
        </Drag>
        <Icon onClick={() => setShowFilter((f) => !f)} onPointerDown={(e) => e.stopPropagation()}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
              clipRule="evenodd"
            />
          </svg>
        </Icon>
      </StyledTitleWithFilter>
      <FilterWrapper toggled={filterShown}>
        <FilterInput ref={inputRef} setFilter={setFilter} />
      </FilterWrapper>
    </>
  )
}
