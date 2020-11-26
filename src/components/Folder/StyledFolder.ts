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

export const StyledContent = styled.div<{ root: boolean; toggled: boolean }>`
  display: grid;
  grid-row-gap: row-v;
  opacity: ${props => (props.toggled ? 1 : 0)};
  transition: opacity 250ms ease;
  transition-delay: ${props => (props.toggled ? '250ms' : 0)};
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
  display: flex;
  align-items: center;
  color: folder-text;
  font-weight: folder;
  background-color: folder-title-bg;
  padding: row-v row-h row-v 0;
  user-select: none;
  cursor: pointer;
  > i {
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: folder-text;
    margin-right: 4px;
    transition: transform 300ms ease;
    &:after {
      content: '';
      display: block;
      position: relative;
      left: 2px;
      top: 4px;
      border-radius: 1px;
      height: 2px;
      width: 6px;
      background-color: folder-title-bg;
    }
  }
`
