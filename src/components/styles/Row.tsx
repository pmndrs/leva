import styled, { css } from '@xstyled/styled-components'

export const Row = styled.div<{ grid?: boolean }>`
  padding: row-v row-h;
  ${props =>
    props.grid &&
    css`
      display: grid;
      grid-template-columns: auto 160px;
      align-items: center;
      grid-column-gap: row-gap;
    `}
`

export const Label = styled.label`
  color: label-text;
  font-weight: label;
`
