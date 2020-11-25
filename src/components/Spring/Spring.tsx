import React, { useRef, useEffect, useCallback } from 'react'
import styled, { useTheme } from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import { useDrag } from 'react-use-gesture'
import { a, useSpring } from 'react-spring'
import { PointCoordinates } from '../PointCoordinates'
import { Row, Label } from '../styles'
import { Canvas, SpringPreview } from './StyledSpring'
import { springFn } from './math'
import { TwixInputProps } from '../../types'
import { Spring as SpringType, SpringSettings } from './spring-props'

type SpringProps = TwixInputProps<SpringType, SpringSettings>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

const SpringPreviewAnimated = a(SpringPreview)

export function Spring({ label, value, onUpdate, settings }: SpringProps) {
  const theme = useTheme()
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)

  const { tension, friction, mass } = value

  const [spring, set] = useSpring(() => ({
    scaleX: 0.5,
    opacity: 0.2,
    immediate: k => k === 'opacity',
  }))

  const bind = useDrag(
    ({ movement: [x, y], axis, last, memo = [tension, friction] }) => {
      if (axis === 'x') onUpdate({ ...value, tension: memo[0] - x * 2 })
      else if (axis === 'y') onUpdate({ ...value, friction: memo[1] - y / 5 })
      if (last) {
        set({
          from: { scaleX: 0, opacity: 0.7 },
          to: [{ scaleX: 0.5 }, { opacity: 0.2 }],
          config: { friction, tension, mass },
        })
      }
      return memo
    },
    { lockDirection: true }
  )

  const drawSpring = useCallback(() => {
    if (!ctx.current) ctx.current = canvas.current!.getContext('2d')
    const _ctx = ctx.current!
    const { width, height } = canvas.current!
    const t = springFn(tension, friction, mass)
    _ctx.clearRect(0, 0, width, height)
    _ctx.beginPath()
    for (let i = 0; i < width; i++) {
      _ctx.lineTo(i, height - (t(i * 8) * height) / 2)
    }
    _ctx.strokeStyle = th.color('folder-border')({ theme })
    _ctx.stroke()
  }, [tension, friction, mass, theme])

  useEffect(() => {
    drawSpring()
  }, [drawSpring])

  useEffect(() => {
    function handleCanvas() {
      canvas.current!.width = canvas.current!.offsetWidth
      canvas.current!.height = canvas.current!.offsetHeight
      drawSpring()
    }
    window.addEventListener('resize', handleCanvas)
    handleCanvas()
    return () => window.removeEventListener('resize', handleCanvas)
  }, [drawSpring])

  return (
    <>
      <Row>
        <Canvas {...bind()} ref={canvas} />
        <SpringPreviewAnimated style={spring} />
      </Row>
      <Row grid>
        <Label>{label}</Label>
        <Container>
          <PointCoordinates value={value} settings={settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </>
  )
}
