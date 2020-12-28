import styled from '@xstyled/styled-components'

export const Range = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  border-radius: 50%;
  background-color: primary;
`

export const Scrubber = styled.div`
  position: absolute;
  width: scrubber-width;
  height: scrubber-height;
  border-radius: input;
  background-color: accent;
  cursor: pointer;
`

export const RangeWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 input;
  cursor: pointer;
`
