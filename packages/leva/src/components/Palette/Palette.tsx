import React from 'react'
import { useInputContext } from '../../context'
import { usePopin } from '../../utils/hooks'
import { Label, Portal, Overlay, Row } from '../UI'
import { LevaInputProps, Palette, PaletteSettings } from '../../types'

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

type PaletteRowProps = { palette: Palette } & React.HTMLAttributes<HTMLDivElement>

function PaletteRow({ palette, ...props }: PaletteRowProps) {
  return (
    <div className={row()} {...props}>
      {palette.map((col, i) => (
        <div key={i} style={{ backgroundColor: col }} />
      ))}
    </div>
  )
}

type PaletteProps = LevaInputProps<number, PaletteSettings>
export function PaletteComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<PaletteProps>()
  const { popinRef, wrapperRef, shown, show, hide } = usePopin()
  const { options } = settings

  const onClick = (palette: Palette) => {
    hide()
    onUpdate(palette)
  }

  return (
    <Row input>
      <Label>{label}</Label>
      <div ref={popinRef}>
        <PaletteRow onClick={show} palette={options[displayValue]} />
        {shown && (
          <Portal>
            <Overlay onPointerUp={hide} style={{ cursor: 'pointer' }} />
            <div className={container()} ref={wrapperRef}>
              {options.map((palette, i) =>
                i !== displayValue ? <PaletteRow key={i} onClick={() => onClick(palette)} palette={palette} /> : null
              )}
            </div>
          </Portal>
        )}
      </div>
    </Row>
  )
}
