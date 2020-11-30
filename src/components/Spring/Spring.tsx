import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import styled from '@xstyled/styled-components'
import { useDrag } from 'react-use-gesture'
import { a, useSpring } from 'react-spring'
import { PointCoordinates } from '../PointCoordinates'
import { Row, Label } from '../styles'
import { Canvas, SpringPreview } from './StyledSpring'
import { springFn } from './math'
import { TwixInputProps } from '../../types'
import { Spring as SpringType, SpringSettings } from './spring-props'
import { debounce } from '../../utils'
import { useThemeValue } from '../../hooks/useThemeValue'

type SpringProps = TwixInputProps<SpringType & { mass: number }, SpringSettings>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

const SpringPreviewAnimated = a(SpringPreview)

export function Spring({ label, displayValue, value, onUpdate, onChange, settings }: SpringProps) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const springRef = useRef(displayValue)
  const primaryColor = useThemeValue('color', 'primary')

  const { tension, friction, mass = 1 } = displayValue
  const { tension: ts, friction: fs } = settings!

  const [spring, set] = useSpring(() => ({
    scaleX: 0.5,
    opacity: 0.2,
    immediate: k => k === 'opacity',
  }))

  const bind = useDrag(
    ({ movement: [x, y], axis, memo = [tension, friction] }) => {
      // FIXME spring fix steps on usedrag
      if (axis === 'x') onChange({ ...value, tension: memo[0] - Math.round(x) * ts!.step! })
      else if (axis === 'y') onChange({ ...value, friction: memo[1] - Math.round(y) * fs!.step! })
      return memo
    },
    { lockDirection: true }
  )

  const updateSpring = useMemo(
    () =>
      debounce(() => {
        const { tension, friction, mass } = springRef.current
        onUpdate(springRef.current)
        set({
          from: { scaleX: 0, opacity: 0.7 },
          to: [{ scaleX: 0.5 }, { opacity: 0.2 }],
          config: { friction, tension, mass },
        })
      }, 250),
    [set, onUpdate]
  )

  const drawSpring = useCallback(() => {
    const { tension, friction, mass } = springRef.current
    if (!ctx.current) ctx.current = canvas.current!.getContext('2d')
    const _ctx = ctx.current!
    const { width, height } = canvas.current!
    const t = springFn(tension, friction, mass)
    _ctx.clearRect(0, 0, width, height)
    _ctx.beginPath()
    for (let i = 0; i < width; i++) {
      _ctx.lineTo(i, height - (t(i * 8) * height) / 2)
    }
    _ctx.strokeStyle = primaryColor
    _ctx.stroke()
  }, [primaryColor])

  useEffect(() => {
    springRef.current = { tension, friction, mass }
    drawSpring()
    updateSpring()
  }, [drawSpring, updateSpring, tension, friction, mass])

  useEffect(() => {
    const handleCanvas = debounce(() => {
      canvas.current!.width = canvas.current!.offsetWidth
      canvas.current!.height = canvas.current!.offsetHeight
      drawSpring()
    }, 250)
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
      <Row input>
        <Label>{label}</Label>
        <Container>
          <PointCoordinates value={displayValue} settings={settings} onUpdate={onUpdate} />
        </Container>
      </Row>
    </>
  )
}
