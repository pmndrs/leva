import React, { useState } from 'react'
import { RgbaColorPicker, RgbaColor, RgbColorPicker } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { Color, InternalColorSettings } from './color-plugin'
import { LevaInputProps } from '../../types/'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Label, Row, Overlay } from '../UI'

type ColorProps = LevaInputProps<Color, InternalColorSettings>

export function ColorComponent({ value, valueKey, displayValue, label, onChange, onUpdate, settings }: ColorProps) {
  const [showPicker, setShowPicker] = useState(false)
  const { format, hasAlpha } = settings
  const rgb = format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
  const ColorPicker = hasAlpha ? RgbaColorPicker : RgbColorPicker

  return (
    <Row input>
      <Label value={value} valueKey={valueKey}>
        {label}
      </Label>
      <PickerContainer>
        <ColorPreview onClick={() => setShowPicker(true)} style={{ background: displayValue }} />
        <ValueInput value={displayValue} onChange={onChange} onUpdate={onUpdate} />
        {showPicker && (
          <PickerWrapper>
            <Overlay onClick={() => setShowPicker(false)} />
            <ColorPicker color={rgb} onChange={onUpdate} />
          </PickerWrapper>
        )}
      </PickerContainer>
    </Row>
  )
}
