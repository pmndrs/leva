import styled from '@xstyled/styled-components'

export const Canvas = styled.canvas`
  height: 80px;
  width: 100%;
  cursor: crosshair;
  display: block;
  touch-action: none;
`

export const SpringPreview = styled.div`
  position: relative;
  top: -2px;
  background-color: folder-border;
  width: 100%;
  height: 2px;
  opacity: 0.2;
  border-radius: 1px;
  transition: opacity 350ms ease;
  transform-origin: left;
`
