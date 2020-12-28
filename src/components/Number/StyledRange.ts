import styled from '@xstyled/styled-components'

export const Range = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 2px;
  border-radius: 1px;
  background-color: primary;
  margin: 0 input;
`

export const Scrubber = styled.div`
  position: absolute;
  width: scrubber-width;
  height: scrubber-height;
  border-radius: input;
  background-color: accent;
  cursor: pointer;
  &:hover {
    transform: scale(1.8, 1);
  }
`
