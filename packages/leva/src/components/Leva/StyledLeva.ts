import styled, { css } from '@xstyled/styled-components'
import { StyledTitle } from '../Folder/StyledFolder'

export const Root = styled.div<{ fillParent: boolean }>`
  /* position */
  ${(props) =>
    !props.fillParent
      ? css`
          position: absolute;
          top: 10px;
          right: 10px;
          color: root-text;
          width: root-width;
          border-radius: root;
          z-index: 1000;
          will-change: transform;
        `
      : css`
          position: relative;
          width: 100%;
        `}

  font-family: mono;
  font-size: root;
  background-color: root-bg;
  box-shadow: root;

  &,
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
  *::selection {
    background-color: selection;
  }
`

export const DragHandle = styled(StyledTitle)`
  position: absolute;
  width: 100%;
  cursor: grab;
  opacity: 0;
  touch-action: none;
`

export const StyledFilter = styled(StyledTitle)`
  position: absolute;
  right: 0;
  z-index: 10;
  padding: 0;

  > input {
    height: 19px;
    padding: 0 row-h;
    background-color: accent;
    transition: bg;
    border: none;
    outline: none;
    color: inherit;
    font-family: inherit;
    font-size: 10px;
    text-align: right;
    border-radius: root;
    &:focus {
      background-color: accent;
    }
    &[value=''] {
      background-color: transparent;
    }
    ::placeholder {
      color: inherit;
      opacity: 0.6;
    }
  }
`
