import React, { useRef, useState } from 'react'
import { RgbaColorPicker, RgbaColor, RgbColorPicker } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Label, Row, Overlay, Portal } from '../UI'
import { useInputContext } from '../../context'
import { usePopin } from '../../hooks'
import { ColorProps, Color as ColorType } from './color-types'

function convertToRgb(value: ColorType, format: string) {
  return format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
}

export function Color({
  value,
  displayValue,
  settings,
  onChange,
  onUpdate,
}: Pick<ColorProps, 'value' | 'displayValue' | 'settings' | 'onChange' | 'onUpdate'>) {
  const { format, hasAlpha } = settings

  const { popinRef, wrapperRef, shown, show, hide } = usePopin()

  // timeout before colorpicker close
  const timer = useRef(0)

  /**
   * @note we're using initialRgb instead of binding
   * const rgb = format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
   * to the ColorPicker as we were doing before
   */
  const [initialRgb, setInitialRgb] = useState(() => convertToRgb(value, format))

  const ColorPicker = hasAlpha ? RgbaColorPicker : RgbColorPicker

  const showPicker = () => {
    setInitialRgb(convertToRgb(value, format))
    show()
  }

  const hideAfterDelay = () => {
    timer.current = window.setTimeout(hide, 500)
  }

  return (
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
  )
}

export function ColorComponent() {
  const { value, displayValue, label, onChange, onUpdate, settings } = useInputContext<ColorProps>()

  return (
    <Row input>
      <Label>{label}</Label>
      <Color value={value} displayValue={displayValue} onChange={onChange} onUpdate={onUpdate} settings={settings} />
    </Row>
  )
}
