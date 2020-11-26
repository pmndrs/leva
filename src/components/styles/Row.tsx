import styled, { css } from '@xstyled/styled-components'

export const Row = styled.div<{ grid?: boolean }>`
  padding: 0 row-h;
  position: relative;
  &:first-of-type {
    padding-top: row-v;
  }
  &:last-of-type {
    padding-bottom: row-v;
  }
  ${props =>
    props.grid &&
    css`
      display: grid;
      grid-template-columns: auto 160px;
      align-items: center;
      grid-column-gap: col-gap;
    `}
`

export const Label = styled.label`
  padding-left: row-h;
  color: label-text;
  font-weight: label;
`
