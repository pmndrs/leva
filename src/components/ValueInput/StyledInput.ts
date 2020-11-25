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
  padding: input;
  margin-right: -input;
  cursor: ew-resize;
  text-transform: uppercase;
  opacity: 0.6;
  font-size: 0.8em;
  user-select: none;
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
`
