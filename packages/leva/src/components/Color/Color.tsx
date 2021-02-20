import React, { useRef, useState } from 'react'
import { RgbaColorPicker, RgbaColor, RgbColorPicker } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { Color, InternalColorSettings } from './color-plugin'
import { LevaInputProps } from '../../types/'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Label, Row, Overlay, Portal } from '../UI'
import { useInputContext } from '../../context'
import { useTh } from '../../styles'
import { useOverlay } from '../../utils/hooks'

type ColorProps = LevaInputProps<Color, InternalColorSettings>

function convertToRgb(value: Color, format: string) {
  return format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
}

export function ColorComponent() {
  const { value, displayValue, label, onChange, onUpdate, settings } = useInputContext<ColorProps>()

  const colorPickerHeight = useTh('sizes', 'colorPickerHeight')
  const { popinRef, wrapperRef, shown, show, hide } = useOverlay(colorPickerHeight)

  // timeout before colorpicker close
  const timer = useRef(0)

  /**
   * @note we're using initialRgb instead of binding
   * const rgb = format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
   * to the ColorPicker as we were doing before
   */
  const [initialRgb, setInitialRgb] = useState(() => convertToRgb(value, format))
  const { format, hasAlpha } = settings
  const ColorPicker = hasAlpha ? RgbaColorPicker : RgbColorPicker

  const showPicker = () => {
    setInitialRgb(convertToRgb(value, format))
    show()
  }

  const hideAfterDelay = () => {
    timer.current = window.setTimeout(hide, 500)
  }

  return (
    <Row input>
      <Label>{label}</Label>
      <PickerContainer ref={popinRef}>
        <ColorPreview active={shown} onClick={() => showPicker()} style={{ background: displayValue }} />
        <ValueInput value={displayValue} onChange={onChange} onUpdate={onUpdate} />
        {shown && (
          <Portal>
            <Overlay onPointerUp={hide} />
            <PickerWrapper
              ref={wrapperRef}
              onMouseEnter={() => window.clearTimeout(timer.current)}
              onMouseLeave={(e) => e.buttons === 0 && hideAfterDelay()}>
              <ColorPicker color={initialRgb} onChange={onUpdate} />
            </PickerWrapper>
          </Portal>
        )}
      </PickerContainer>
    </Row>
  )
}
