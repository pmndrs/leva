import React from 'react'
import { Vector, InternalVectorSettings } from '../Vector'
import { LevaInputProps, Vector3d, Vector as VectorType } from '../../types'
import { Label, Row } from '../UI'
import { useInputContext } from '../../context'

export type InternalVector3dSettings = InternalVectorSettings<string, [string, string, string]>
export type Vector3dProps = LevaInputProps<Vector3d, InternalVector3dSettings, VectorType>

export function Vector3dComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<Vector3dProps>()
  return (
    <Row input>
      <Label>{label}</Label>
      <Vector value={displayValue} settings={settings} onUpdate={onUpdate} />
    </Row>
  )
}
