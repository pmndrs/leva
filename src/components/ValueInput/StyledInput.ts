import styled from '@xstyled/styled-components'

export const StyledInput = styled.input`
  /* input reset */
  background: none;
  appearance: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  padding: input;
  width: 0;
  min-width: 0;
  flex: 1;
  /* input styling */
  border: none;
  outline: none;
`

export const InnerLabel = styled.div`
  height: 100%;
  > :first-of-type {
    width: 14px;
    height: 100%;
    margin-right: -input;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ew-resize;
    text-transform: uppercase;
    opacity: 0.3;
    font-size: 0.8em;
    user-select: none;
    &:hover {
      opacity: 0.8;
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: input;
  border-style: solid;
  border-width: input;
  border-color: input-border;
  color: input-text;
  transition: border-color 250ms ease;
  &:hover {
    border-color: input-hover-border;
  }
  &:focus-within {
    border-color: input-focus-border;
  }
  &:active {
    background-color: input-active-bg;
  }
`
