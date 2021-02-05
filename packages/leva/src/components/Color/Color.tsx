import React, { useRef, useState, useEffect } from 'react'
import { RgbaColorPicker, RgbaColor, RgbColorPicker } from 'react-colorful'
import tinycolor from 'tinycolor2'
// @ts-expect-error
import { Portal } from 'react-portal'

import { Color, InternalColorSettings } from './color-plugin'
import { LevaInputProps } from '../../types/'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Label, Row, Overlay } from '../UI'
import { useInputContext } from '../../context'
import { useTh } from '../../styles'

type ColorProps = LevaInputProps<Color, InternalColorSettings>

export function ColorComponent() {
  const { value, displayValue, label, onChange, onUpdate, settings } = useInputContext<ColorProps>()

  const pickerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const colorPickerHeight = useTh('sizes', '$colorPickerHeight')

  const [pickerDirection, setPickerDirection] = useState<'up' | 'down' | false>(false)
  const { format, hasAlpha } = settings
  const rgb = format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
  const ColorPicker = hasAlpha ? RgbaColorPicker : RgbColorPicker

  const showPicker = () => {
    const { bottom } = pickerRef.current!.getBoundingClientRect()
    const direction = bottom + parseFloat(colorPickerHeight) > window.innerHeight - 40 ? 'up' : 'down'
    setPickerDirection(direction)
  }

  const hidePicker = () => {
    setPickerDirection(false)
  }

  useEffect(() => {
    if (pickerDirection) {
      const bounds = pickerRef.current!.getBoundingClientRect()
      wrapperRef.current!.style.left = bounds.left + 'px'
      if (pickerDirection === 'down') wrapperRef.current!.style.top = bounds.bottom + 3 + 'px'
      else wrapperRef.current!.style.bottom = window.innerHeight - bounds.top + 3 + 'px'
    }
  }, [pickerDirection])

  return (
    <Row input>
      <Label>{label}</Label>
      <PickerContainer ref={pickerRef}>
        <ColorPreview active={!!pickerDirection} onClick={() => showPicker()} style={{ background: displayValue }} />
        <ValueInput value={displayValue} onChange={onChange} onUpdate={onUpdate} />
        {!!pickerDirection && (
          <Portal>
            <Overlay onClick={() => hidePicker()} />
            <PickerWrapper ref={wrapperRef}>
              <ColorPicker color={rgb} onChange={onUpdate} />
            </PickerWrapper>
          </Portal>
        )}
      </PickerContainer>
    </Row>
  )
}
