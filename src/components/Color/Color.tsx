import React, { useCallback, useState } from 'react'
import { ColorChangeHandler, SketchPicker } from 'react-color'
import { ColorSettings } from '../../types'
import { Overlay } from '../Misc'

const emptyArray: any = []

type ColorProps = {
  value: string
  onUpdate: (value: string) => void
} & ColorSettings

export function Color({ value, onUpdate }: ColorProps) {
  const _onUpdate: ColorChangeHandler = useCallback(color => onUpdate(color.hex), [onUpdate])
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div>
      <div onClick={() => setShowPicker(true)} style={{ height: 20, width: 20, background: value }} />
      {showPicker && (
        <div style={{ position: 'absolute', left: -50, zIndex: 100 }}>
          <Overlay onClick={() => setShowPicker(false)} />
          <SketchPicker presetColors={emptyArray} color={value} onChange={_onUpdate} />
        </div>
      )}
    </div>
  )
}
