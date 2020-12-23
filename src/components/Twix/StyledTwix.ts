import styled from '@xstyled/styled-components'
import { StyledTitle } from '../Folder/StyledFolder'

export const Root = styled.div`
  /* position */
  position: absolute;
  top: 10px;
  right: 10px;

  /* global styling */
  font-family: mono;
  font-size: root;
  color: root-text;
  width: root-width;
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
