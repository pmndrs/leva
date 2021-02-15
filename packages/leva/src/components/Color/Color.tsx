import React, { useRef, useState, useLayoutEffect } from 'react'
import { RgbaColorPicker, RgbaColor, RgbColorPicker } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { Color, InternalColorSettings } from './color-plugin'
import { LevaInputProps } from '../../types/'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Label, Row, Overlay, Portal } from '../UI'
import { useInputContext } from '../../context'
import { useTh } from '../../styles'

type ColorProps = LevaInputProps<Color, InternalColorSettings>

function convertToRgb(value: Color, format: string) {
  return format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
}

export function ColorComponent() {
  const { value, displayValue, label, onChange, onUpdate, settings } = useInputContext<ColorProps>()

  const pickerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const colorPickerHeight = useTh('sizes', 'colorPickerHeight')

  // timeout before colorpicker close
  const timer = useRef(0)

  const [pickerDirection, setPickerDirection] = useState<'up' | 'down' | false>(false)
  /**
   * @note we're using initialRgb instead of binding
   * const rgb = format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
   * to the ColorPicker as we were doing before
   */
  const [initialRgb, setInitialRgb] = useState(() => convertToRgb(value, format))
  const { format, hasAlpha } = settings
  const ColorPicker = hasAlpha ? RgbaColorPicker : RgbColorPicker

  const showPicker = () => {
    const { bottom } = pickerRef.current!.getBoundingClientRect()
    const direction = bottom + parseFloat(colorPickerHeight) > window.innerHeight - 40 ? 'up' : 'down'
    setInitialRgb(convertToRgb(value, format))
    setPickerDirection(direction)
  }

  const hidePicker = () => {
    setPickerDirection(false)
  }

  const hidePickerAfterDelay = () => {
    timer.current = window.setTimeout(hidePicker, 500)
  }

  useLayoutEffect(() => {
    if (pickerDirection) {
      const bounds = pickerRef.current!.getBoundingClientRect()
      wrapperRef.current!.style.left = bounds.left + 'px'
      if (pickerDirection === 'down') wrapperRef.current!.style.top = bounds.bottom + 3 + 'px'
      else wrapperRef.current!.style.bottom = window.innerHeight - bounds.top + 3 + 'px'
    }
    return () => window.clearTimeout(timer.current)
  }, [pickerDirection])

  return (
    <Row input>
      <Label>{label}</Label>
      <PickerContainer ref={pickerRef}>
        <ColorPreview active={!!pickerDirection} onClick={() => showPicker()} style={{ background: displayValue }} />
        <ValueInput value={displayValue} onChange={onChange} onUpdate={onUpdate} />
        {!!pickerDirection && (
          <Portal>
            <Overlay onPointerUp={() => hidePicker()} />
            <PickerWrapper
              ref={wrapperRef}
              onMouseEnter={() => window.clearTimeout(timer.current)}
              onMouseLeave={(e) => e.buttons === 0 && hidePickerAfterDelay()}>
              <ColorPicker color={initialRgb} onChange={onUpdate} />
            </PickerWrapper>
          </Portal>
        )}
      </PickerContainer>
    </Row>
  )
}
