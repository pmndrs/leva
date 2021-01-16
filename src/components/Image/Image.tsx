import React, { useCallback } from 'react'
import { Label, Row } from '../styles'
import { useDropzone } from 'react-dropzone'
import { DropZone, Preview, Instructions, Remove } from './StyledImage'
import { LevaInputProps } from '../../types/'

type ImageProps = LevaInputProps<string | undefined>

export function Image({ label, value, onUpdate }: ImageProps) {
  const onDrop = useCallback(
    acceptedFiles => {
      if (!acceptedFiles.length) return
      onUpdate(acceptedFiles[0])
    },
    [onUpdate]
  )

  const clear = useCallback(
    e => {
      e.stopPropagation()
      onUpdate(undefined)
    },
    [onUpdate]
  )

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({ maxFiles: 1, accept: 'image/*', onDrop })

  return (
    <Row input>
      <Label>{label}</Label>
      <DropZone {...getRootProps({ isDragAccept })}>
        <input {...getInputProps()} />
        {value ? (
          <Preview>
            <img src={value} alt={`preview for ${label}`} />
            <Remove onClick={clear} />
          </Preview>
        ) : (
          <Instructions>{isDragAccept ? 'drop image here' : 'click to select'}</Instructions>
        )}
      </DropZone>
    </Row>
  )
}
