import styled from '@xstyled/styled-components'

export const StyledButton = styled.button`
  display: block;
  font-family: inherit;
  font-size: inherit;
  color: button-text;
  font-weight: bold;
  appearance: none;
  margin-left: row-h; /* accounts for label margin */
  height: 100%;
  border-style: solid;
  border-radius: input;
  border-width: 1px;
  border-color: input-hover-border;
  outline: none;
  background-color: button-bg;
  transition: border-bg;
  cursor: pointer;
  &:hover {
    border-color: input-focus-border;
  }
  &:active {
    background-color: input-active-bg;
    border-color: input-focus-color;
  }
`
