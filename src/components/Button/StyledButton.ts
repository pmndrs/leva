import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

export const StyledButton = styled.button`
  display: block;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  font-weight: bold;
  appearance: none;
  margin-left: row-h; /* accounts for label margin */
  width: calc(100% - ${th.space('row-h')});
  height: 100%;
  border-style: solid;
  border-radius: input;
  border-width: 1px;
  border-color: input-hover-border;
  outline: none;
  background-color: #fff;
  transition: border-bg;
  &:hover {
    border-color: input-focus-border;
  }
  &:active {
    background-color: input-active-bg;
    border-color: input-focus-color;
  }
`
