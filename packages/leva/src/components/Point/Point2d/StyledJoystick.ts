import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

export const JoystickTrigger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: input-bg;
  border-radius: input;
  border-style: solid;
  border-width: 1px;
  border-color: input-border;
  cursor: pointer;
  height: row-height;
  width: row-height;
  touch-action: none;
  &:hover {
    border-color: input-hover-border;
  }
  &:active {
    border-color: input-focus-border;
    cursor: crosshair;
  }
  :after {
    content: '';
    background-color: accent;
    height: 4px;
    width: 4px;
    border-radius: 2px;
  }
`

export const JoystickPlayground = styled.div<{ isOutOfBounds: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: joystick-width;
  height: joystick-height;
  background-color: ${props => th.color(props.isOutOfBounds ? 'input-border' : 'root-bg')};
  border-radius: input;
  border-style: solid;
  border-width: 1px;
  border-color: input-border;
  box-shadow: overlay;
  position: absolute;
  z-index: 100;
  overflow: hidden;
  transition: bg;

  > div {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-color: input-border;
    background-color: input-bg;
    width: 80%;
    height: 80%;
    :after,
    :before {
      content: '';
      position: absolute;
      z-index: 10;
      background-color: input-border;
    }
    :before {
      width: 100%;
      height: 1px;
    }
    :after {
      height: 100%;
      width: 1px;
    }
  }

  > span {
    position: relative;
    z-index: 100;
    width: 10px;
    height: 10px;
    background-color: accent;
    border-radius: 50%;
  }
`
