import styled, { css } from '@xstyled/styled-components'
import { th } from '@xstyled/system'

export const StyledFolder = styled.div<{ root: boolean }>`
  border-left-style: solid;
  border-left-width: folder;
  border-left-color: folder-border;
  margin-top: folder-v;
  ${props =>
    props.root &&
    css`
      border-left-style: none;
      margin-top: 0;
    `}
`

export const StyledContent = styled.div<{ root: boolean }>`
  > ${StyledFolder} {
    margin-left: folder-h;
  }
  ${props =>
    props.root &&
    css`
      > ${StyledFolder} {
        margin-left: 0;
        border-width: calc(${th.borderWidth('folder')} - ${th.borderWidth('root')});
      }
    `}
`

export const StyledTitle = styled.div`
  color: folder-text;
  font-weight: folder;
  background-color: folder-title-bg;
  padding: row-v row-h;
  user-select: none;
  cursor: pointer;
`
