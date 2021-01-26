import styled, { css } from '@xstyled/styled-components'
import { th } from '@xstyled/system'

export const StyledFolder = styled.div<{ root: boolean }>`
  margin-top: folder-v;
  & + & {
    margin-top: calc(-${th.space('row-v')});
  }
  ${props =>
    props.root &&
    css`
      margin-top: 0;
      > ${StyledTitle} {
        border-radius: root root 0 0;
      }
    `}
`

export const StyledWrapper = styled.div<{ root: boolean }>`
  ${props =>
    !props.root
      ? css`
          border-left-style: solid;
          border-left-width: folder;
          border-left-color: folder-border;
        `
      : css`
          border-style: solid;
          border-width: root;
          border-color: root-border;
        `}
`

export const StyledContent = styled.div<{ root: boolean; toggled: boolean }>`
  padding-top: row-v;
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
        &:first-of-type {
          margin-top: -row-v;
          > ${StyledTitle} {
            border-radius: root root 0 0;
          }
        }

        > ${StyledWrapper} {
          border-width: calc(${th.borderWidth('folder')} - ${th.borderWidth('root')});
        }
      }
    `}
`

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  color: folder-text;
  font-weight: folder;
  background-color: folder-title-bg;
  padding: row-v row-h row-v;
  padding-left: ${th.borderWidth('folder')};
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
