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
