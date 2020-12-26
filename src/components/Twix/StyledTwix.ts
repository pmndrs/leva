import styled, { css } from '@xstyled/styled-components'
import { StyledTitle } from '../Folder/StyledFolder'

export const Root = styled.div<{ fillParent: boolean }>`
  /* position */
  ${props =>
    !props.fillParent
      ? css`
          position: absolute;
          top: 10px;
          right: 10px;
          color: root-text;
          width: root-width;
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
`
