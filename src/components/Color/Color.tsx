import React, { useState } from 'react'
import { RgbaColorPicker, RgbaColor } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { Overlay } from '../Misc'
import { Color as ColorType, InternalColorSettings } from './color-plugin'
import { TwixInputProps } from '../../types'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Row, Label } from '../styles'

type ColorProps = TwixInputProps<ColorType, InternalColorSettings>

export function Color({ value, displayValue, label, onChange, onUpdate, settings }: ColorProps) {
  const [showPicker, setShowPicker] = useState(false)
  const rgb = settings.format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
  return (
    <Row input>
      <Label>{label}</Label>
      <PickerContainer>
        <ColorPreview onClick={() => setShowPicker(true)} style={{ background: displayValue }} />
        <ValueInput value={displayValue} onChange={onChange} onUpdate={onUpdate} />
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
