import styled from '@xstyled/styled-components'

export const Canvas = styled.canvas`
  height: 80px;
  width: 100%;
  cursor: crosshair;
  display: block;
`

export const SpringPreview = styled.div`
  background-color: folder-border;
  width: 100%;
  height: 2px;
  opacity: 0.2;
  border-radius: 1px;
  transition: opacity 350ms ease;
  transform-origin: left;
`
