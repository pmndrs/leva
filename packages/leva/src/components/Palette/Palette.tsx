import React from 'react'
import { LevaInputProps } from '../../types'
import { useInputContext } from '../../context'
import { useOverlay } from '../../utils/hooks'
import { Label, Portal, Overlay, Row } from '../UI'

import { css } from '../../styles'

const container = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  position: 'relative'
})

const row = css({
  display: 'grid',
  gridTemplateRows: "1fr",
  gridTemplateColumns: "repeat(auto-fit, minmax(1px, 1fr))",
  height: "$rowHeight",
  borderRadius: '$sm',
  overflow: 'hidden',
  cursor: 'pointer',
  position: "relative",
  $inputStyle: true,
  $hover: true
})

export function PaletteComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<LevaInputProps<string>>()
  const { popinRef, wrapperRef, shown, show, hide } = useOverlay(400)

  return (
    <Row input>
      <Label>{label}</Label>

      <div>
        <div className={row()} onClick={show} ref={popinRef}>
          {settings.options[displayValue].map((col: string) => (
            <div style={{ backgroundColor: col }} />
          ))}
        </div>

        {shown && (
          <Portal>
            <Overlay onPointerUp={hide} style={{ cursor: 'pointer' }} />

            <div className={container()} ref={wrapperRef}>
              {settings.options.map((palette, i) => {
                return (
                  <div className={row()} onClick={() => {
                    hide()
                    onUpdate(settings.options[i])
                  }}>
                    {palette.map((col: string) => (
                      <div style={{ backgroundColor: col }} />
                    ))}
                  </div>
                )
              })}
            </div>

          </Portal>
        )}
      </div>
    </Row>
  )
}
