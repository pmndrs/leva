import React, { useCallback, useState } from 'react'
import { ColorChangeHandler, SketchPicker } from 'react-color'
import { Overlay } from '../Misc'
import { Color as ColorType } from './color-props'
import { TwixInputProps } from '../../types'

const emptyArray: any = []

export function Color({ value, onUpdate }: TwixInputProps<ColorType>) {
  const _onUpdate: ColorChangeHandler = useCallback(color => onUpdate(color.hex), [onUpdate])
  const [showPicker, setShowPicker] = useState(false)

  // TODO fix value as any
  return (
    <div>
      <div onClick={() => setShowPicker(true)} style={{ height: 20, width: 20, background: value as any }} />
      {showPicker && (
        <div style={{ position: 'absolute', left: -50, zIndex: 100 }}>
          <Overlay onClick={() => setShowPicker(false)} />
          <SketchPicker presetColors={emptyArray} color={value} onChange={_onUpdate} />
        </div>
      )}
    </div>
  )
}
