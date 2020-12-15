import styled from '@xstyled/styled-components'
import { th } from '@xstyled/system'

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${th.size('row-height')} repeat(2, 1fr);
  grid-column-gap: col-gap;
`
export const JoystickTrigger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
    cursor: crosshair;
  }
  :after {
    content: ' ';
    background-color: accent;
    height: 4px;
    width: 4px;
    border-radius: 2px;
  }
`

export const Joystick = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: joystick-width;
  height: joystick-height;
  background-color: root-bg;
  border-radius: input;
  border-style: solid;
  border-width: 1px;
  border-color: input-border;
  box-shadow: overlay;
  position: absolute;
  z-index: 100;
  overflow: hidden;
  /*
  bottom: -${th.space('col-gap')};
  left: 0;
  transform: translateY(100%);
  */
  :after, :before {
    content: '';
    position: absolute;
    height: 1px;
    background-color: primary;
  }
  :before {
    width: joystick-width;
  }
  :after {
    width: joystick-height;
    transform: rotate(90deg);
  }

  > div {
    position: relative;
    z-index: 10;
    width: 10px;
    height: 10px;
    background-color: accent;
    border-radius: 50%;
  }
`
