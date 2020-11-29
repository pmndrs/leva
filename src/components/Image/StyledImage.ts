import styled, { css } from '@xstyled/styled-components'
import { DropzoneRootProps } from 'react-dropzone'

export const DropZone = styled.div<DropzoneRootProps>`
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: input-border;
  border-radius: input;
  transition: border-bg;
  outline: none;
  cursor: pointer;
  ${props =>
    props.isDragAccept &&
    css`
      background-color: input-active-bg;
      border-color: input-focus-border;
    `}
  &:hover {
    border-color: input-hover-border;
  }
`

export const Preview = styled.div`
  position: relative;
  width: 100%;
  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const Instructions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.4;
  font-size: 0.8em;
  height: 100%;
  padding: row-v row-h;
`

export const Remove = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  margin: row-v row-h;
  height: 20px;
  width: 20px;
  border-radius: input;
  background-color: primary;
  border: 1px solid #ffffff99;
  &:hover {
    border-color: #ffffffff;
    background-color: accent;
  }
  transition: border-bg;
  :after,
  :before {
    content: '';
    position: absolute;
    height: 2px;
    width: 10px;
    border-radius: 1px;
    background-color: #fff;
  }
  :after {
    transform: rotate(45deg);
  }
  :before {
    transform: rotate(-45deg);
  }
`
