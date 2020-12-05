import styled, { css } from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import { StyledContent } from '../Folder/StyledFolder'

export const Row = styled.div<{ input?: boolean }>`
  position: relative;
  display: grid;
  grid-row-gap: row-v;
  grid-template-rows: minmax(${th.size('row-height')}, max-content);
  align-items: center;
  ${StyledContent} > & {
    padding: 0 row-h;
    :first-of-type {
      padding-top: row-v;
    }
    :last-of-type {
      padding-bottom: row-v;
    }
  }
  ${props =>
    props.input &&
    css`
      grid-template-columns: auto 160px;
      grid-column-gap: col-gap;
    `}
`

export const Label = styled.label<{ preventSelect?: boolean }>`
  padding-left: row-h;
  color: label-text;
  font-weight: label;
  ${prop =>
    prop.preventSelect &&
    css`
      user-select: none;
      cursor: ew-resize;
    `}
`
