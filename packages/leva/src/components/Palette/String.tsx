import React from 'react'
import { LevaInputProps } from '../../types'
import { Label, Row } from '../UI'
import { useInputContext } from '../../context'

import { css } from '../../styles'

const container = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  position: 'relative',
})

const row = css({
  display: 'grid',
  gridTemplateRows: "1fr",
  gridTemplateColumns: "repeat(auto-fit, minmax(1px, 1fr))",
  height: '24px',
  borderRadius: '4px',
  overflow: 'hidden',
  cursor: 'pointer',
})

export function StringComponent() {
  const { label, displayValue, onUpdate, settings } = useInputContext<LevaInputProps<string>>()

  return (
    <Row input>
      <Label>{label}</Label>

      <div>
        <div className={row()}>
          {settings.options[displayValue].map((col: string) => (
            <div style={{ backgroundColor: col }} />
          ))}
        </div>
        
        {/* 
          * These will go in the popup
         */}
        <div className={container()}>
          {settings.options.map((palette, i) => {
            return (
              <div className={row()} onClick={() => onUpdate(settings.options[i])}>
                {palette.map((col: string) => (
                  <div style={{ backgroundColor: col }} />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </Row>
  )
}
