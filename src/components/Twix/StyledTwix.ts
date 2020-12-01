import styled from '@xstyled/styled-components'

export const Root = styled.div`
  /* position */
  position: absolute;
  top: 10px;
  right: 10px;

  /* global styling */
  font-family: mono;
  font-size: root;
  width: root-width;
  background-color: root-bg;
  border-radius: root;
  box-shadow: root;
  border-style: solid;
  border-width: root;
  border-color: root-border;

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
