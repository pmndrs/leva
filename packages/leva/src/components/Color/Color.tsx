import React, { useRef, useState } from 'react'
import { RgbaColorPicker, RgbaColor, RgbColorPicker } from 'react-colorful'
import tinycolor from 'tinycolor2'
import { PickerWrapper, ColorPreview, PickerContainer } from './StyledColor'
import { ValueInput } from '../ValueInput'
import { Label, Row, Overlay, Portal } from '../UI'
import { useInputContext } from '../../context'
import { usePopin } from '../../hooks'
import type { ColorProps, Color as ColorType } from './color-types'

function convertToRgb(value: ColorType, format: string) {
  return format !== 'rgb' ? tinycolor(value).toRgb() : (value as RgbaColor)
}

export function Color({
  value,
  displayValue,
  settings,
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
    <>
      <ColorPreview ref={popinRef} active={shown} onClick={() => showPicker()} style={{ color: displayValue }} />
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
    </>
  )
}

export function ColorComponent() {
  const { value, displayValue, label, onChange, onUpdate, settings } = useInputContext<ColorProps>()

  return (
    <Row input>
      <Label>{label}</Label>
      <PickerContainer>
        <Color value={value} displayValue={displayValue} onChange={onChange} onUpdate={onUpdate} settings={settings} />
        <ValueInput value={displayValue} onChange={onChange} onUpdate={onUpdate} />
      </PickerContainer>
    </Row>
  )
}
