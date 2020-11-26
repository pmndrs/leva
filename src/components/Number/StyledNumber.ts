import styled, { css } from '@xstyled/styled-components'

export const RangeGrid = styled.div<{ hasRange: boolean }>`
  ${props =>
    props.hasRange &&
    css`
      position: relative;
      display: grid;
      grid-template-columns: 3fr 2fr;
      grid-column-gap: col-gap;
      align-items: center;
    `}
`

export const Range = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 2px;
  border-radius: 1px;
  background-color: folder-border;
  margin: 0 input;
`

export const Scrubber = styled.div`
  position: absolute;
  width: 12px;
  height: 14px;
  border-radius: 2px;
  background-color: boolean-checked-bg;
  cursor: pointer;
`
