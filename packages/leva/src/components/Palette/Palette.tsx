import React from 'react'
import { LevaInputProps } from '../../types'
import { useInputContext } from '../../context'
import { usePopin } from '../../utils/hooks'
import { Label, Portal, Overlay, Row } from '../UI'

import { css } from '../../styles'

const container = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  width: '$controlWidth',
  position: 'relative',
})

const row = css({
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: 'repeat(auto-fit, minmax(1px, 1fr))',
  height: '$rowHeight',
  borderRadius: '$sm',
  overflow: 'hidden',
  cursor: 'pointer',
  position: 'relative',
  $inputStyle: '',
  $hover: '',
})

function PaletteRow({ palette, ...props }) {
  return (
    <div className={row()} {...props}>
      {palette.map((col: string, i) => (
        <div key={i} style={{ backgroundColor: col }} />
      ))}
    </div>
  )
}

export function PaletteComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<LevaInputProps<string>>()
  const { popinRef, wrapperRef, shown, show, hide } = usePopin(400)

  return (
    <Row input>
      <Label>{label}</Label>
      <div ref={popinRef}>
        <PaletteRow onClick={show} palette={settings.options[displayValue]} />

        {shown && (
          <Portal>
            <Overlay onPointerUp={hide} style={{ cursor: 'pointer' }} />
            <div className={container()} ref={wrapperRef}>
              {settings.options.map((palette, i) =>
                i !== displayValue ? (
                  <PaletteRow
                    key={i}
                    onClick={() => {
                      hide()
                      onUpdate(palette)
                    }}
                    palette={palette}
                  />
                ) : null
              )}
            </div>
          </Portal>
        )}
      </div>
    </Row>
  )
}
