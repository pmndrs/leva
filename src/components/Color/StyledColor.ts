import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import 'react-colorful/dist/index.css'

export const ColorPreview = styled.div`
  border-radius: input;
  border-style: solid;
  border-width: 1px;
  border-color: input-border;
  cursor: pointer;
  height: row-height;
  width: row-height;
  &:hover {
    border-color: input-hover-border;
  }
  &:active {
    border-color: input-focus-border;
  }
`

export const PickerContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${th.size('row-height')} auto;
  grid-column-gap: col-gap;
  align-items: center;
  > span {
    font-size: 0.95em;
    opacity: 0.8;
    padding: 0 row-h;
  }
`

export const PickerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;

  .react-colorful {
    width: 100px;
    height: 100px;
    transform: translateY(100%);
    box-shadow: overlay;
    cursor: crosshair;
  }

  .react-colorful__saturation {
    border-radius: input input 0 0;
  }

  .react-colorful__alpha,
  .react-colorful__hue {
    height: 10px;
  }

  .react-colorful__last-control {
    border-radius: 0 0 input input;
  }

  .react-colorful__pointer {
    height: 12px;
    width: 12px;
  }
`
