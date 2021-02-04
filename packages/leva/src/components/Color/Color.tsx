import React, { useRef, useState } from 'react'
import { RgbaColorPicker, RgbaColor, RgbColorPicker } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { Color, InternalColorSettings } from './color-plugin'
import { LevaInputProps } from '../../types/'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Label, Row, Overlay } from '../UI'
import { useInputContext } from '../../hooks'
import { useTh } from '../../styles'
import { useShowWrapper } from '../../context'

type ColorProps = LevaInputProps<Color, InternalColorSettings>

export function ColorComponent() {
  const { value, displayValue, label, onChange, onUpdate, settings } = useInputContext<ColorProps>()
  const showWrapper = useShowWrapper()

  const pickerRef = useRef<HTMLDivElement>(null)
  const colorPickerHeight = useTh('sizes', '$colorPickerHeight')

  const [pickerStatus, setPickerStatus] = useState<'up' | 'down' | 'hidden'>('hidden')
  const { format, hasAlpha } = settings
  const rgb = format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
  const ColorPicker = hasAlpha ? RgbaColorPicker : RgbColorPicker

  const showPicker = () => {
    const { bottom } = pickerRef.current!.getBoundingClientRect()
    const direction = bottom + parseFloat(colorPickerHeight) > window.innerHeight - 40 ? 'up' : 'down'
    showWrapper(true)
    setPickerStatus(direction)
  }

  const hidePicker = () => {
    showWrapper(false)
    setPickerStatus('hidden')
  }

  return (
    <Row input>
      <Label>{label}</Label>
      <PickerContainer ref={pickerRef}>
        <ColorPreview
          active={pickerStatus !== 'hidden'}
          onClick={() => showPicker()}
          style={{ background: displayValue }}
        />
        <ValueInput value={displayValue} onChange={onChange} onUpdate={onUpdate} />
        {pickerStatus !== 'hidden' && (
          <PickerWrapper direction={pickerStatus}>
            <Overlay onClick={() => hidePicker()} />
            <ColorPicker color={rgb} onChange={onUpdate} />
          </PickerWrapper>
        )}
      </PickerContainer>
    </Row>
  )
}
