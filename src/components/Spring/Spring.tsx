import React, { useRef, useEffect } from 'react'
import styled, { useTheme } from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import { a, useSpring } from 'react-spring'
import { PointCoordinates } from '../PointCoordinates'
import { Row, Label } from '../styles'
import { Canvas } from './StyledSpring'
import { springFn } from './math'
import { TwixInputProps } from '../../types'
import { Spring as SpringType, SpringSettings } from './spring-props'

type SpringProps = TwixInputProps<SpringType, SpringSettings>

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: col-gap;
`

export function Spring({ label, value, onUpdate, settings }: SpringProps) {
  const theme = useTheme()
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)

  const { tension, friction, mass } = value

  useEffect(() => {
    function handleCanvas() {
      canvas.current!.width = canvas.current!.offsetWidth
      canvas.current!.height = canvas.current!.offsetHeight
    }
    window.addEventListener('resize', handleCanvas)
    handleCanvas()
    return () => window.removeEventListener('resize', handleCanvas)
  }, [])

  useEffect(() => {
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
  }, [friction, tension, mass])

  return (
    <>
      <Row>
        <Canvas ref={canvas} />
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
