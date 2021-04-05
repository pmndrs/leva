import React from 'react'
import { ComponentPropsWithoutRef, forwardRef, useRef, MouseEventHandler } from 'react'
import { Meta, Story } from '@storybook/react'
import Reset from './components/decorator-reset'

import { useControls } from '../src'

export default {
  title: 'Misc/Controlled inputs',
  decorators: [Reset],
} as Meta

const formStyles: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.5em' }

export const ExternalUpdatesWithSet: Story = () => {
  const [{ username, counter }, set] = useControls(() => ({ username: 'Mario', counter: 0 }))

  return (
    <form style={formStyles}>
      <label>
        username: <input type="text" value={username} onChange={(e) => set({ username: e.target.value })} />
      </label>
      <label>
        counter: {counter}{' '}
        <button type="button" onClick={() => set({ counter: counter + 1 })}>
          ➕ inc
        </button>
      </label>
    </form>
  )
}

const Circle = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#eee',
        border: '1px solid #222',
      }}
      {...props}
    />
  )
})

ExternalUpdatesWithSet.storyName = 'external updates with set'

export const OnChangeAndSet: Story = () => {
  const isDragging = useRef(false)
  const circleRef = useRef<HTMLDivElement>(null)
  const [, set] = useControls(() => ({
    mousePosition: {
      value: { x: 100, y: 150 },
      onChange: (position) => {
        const element = circleRef.current
        if (element) {
          element.style.transform = `translate3d(
            calc(${position.x}px - 50%), calc(${position.y}px - 50%), 0)`
        }
      },
    },
  }))

  const onDragStart: MouseEventHandler<HTMLDivElement> = (event) => {
    event.currentTarget.style.cursor = 'grabbing'
    isDragging.current = true
  }
  const onDragMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isDragging.current) {
      const newPosition = {
        x: event.clientX,
        y: event.clientY,
      }
      set({ mousePosition: newPosition })
    }
  }
  const onDragStop: MouseEventHandler<HTMLDivElement> = (event) => {
    event.currentTarget.style.cursor = 'initial'
    isDragging.current = false
  }

  return (
    <div style={{ padding: '2em' }}>
      <p>Drag the circle around or change its position from leva input.</p>
      <Circle
        ref={circleRef}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragStop}
        onPointerOut={onDragStop}
      />
    </div>
  )
}

OnChangeAndSet.storyName = 'onChange and set'
