import React, { useState } from 'react'
import { RgbaColorPicker, RgbaColor } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { Overlay } from '../Misc'
import { Color as ColorType, ColorSettings } from './color-props'
import { TwixInputProps } from '../../types'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { Row, Label } from '../styles'

type ColorProps = TwixInputProps<ColorType, ColorSettings>

export function Color({ value, displayValue, label, onUpdate, settings }: ColorProps) {
  const [showPicker, setShowPicker] = useState(false)
  const rgb = settings!.format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
  return (
    <Row input>
      <Label>{label}</Label>
      <PickerContainer>
        <ColorPreview onClick={() => setShowPicker(true)} style={{ height: 20, width: 20, background: displayValue }} />
        <span>{displayValue}</span>
        {showPicker && (
          <PickerWrapper>
            <Overlay onClick={() => setShowPicker(false)} />
            <RgbaColorPicker color={rgb} onChange={onUpdate} />
          </PickerWrapper>
        )}
      </PickerContainer>
    </Row>
  )
}
