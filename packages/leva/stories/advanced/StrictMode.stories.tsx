import React, { StrictMode, useState, useEffect } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { expect, within, waitFor } from 'storybook/test'

import Reset from '../components/decorator-reset'
import { useControls, folder } from '../../src'

export default {
  title: 'Advanced/StrictMode',
  decorators: [Reset],
} as Meta

/**
 * This story reproduces the issue where controls don't render correctly
 * in StrictMode when used with dynamically mounted components (like R3F Canvas).
 * The issue was that the useToggle hook's height calculation would run
 * prematurely during StrictMode's double-invocation.
 */

// Simulates a component that mounts asynchronously (like R3F Canvas content)
const AsyncMountedComponent = ({ delay = 100 }: { delay?: number }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const values = useControls('Async Component', {
    position: { value: { x: 0, y: 0, z: 0 }, step: 0.1 },
    scale: { value: 1, min: 0.1, max: 2, step: 0.1 },
    color: '#ff0000',
    visible: true,
    settings: folder({
      wireframe: false,
      castShadow: true,
      receiveShadow: true,
    }),
  })

  if (!mounted) return <div>Loading...</div>

  return (
    <div style={{ padding: 20, background: '#f0f0f0', marginTop: 20 }}>
      <h3>Async Mounted Component</h3>
      <pre data-testid="async-output">{JSON.stringify(values, null, 2)}</pre>
    </div>
  )
}

const NestedFoldersComponent = () => {
  const values = useControls('Nested Folders', {
    basic: 1,
    folder1: folder({
      value1: 'test',
      value2: 42,
      nested: folder({
        deep: true,
        color: '#00ff00',
      }),
    }),
    folder2: folder(
      {
        collapsed: 'initial',
        data: [1, 2, 3],
      },
      { collapsed: true }
    ),
  })

  return (
    <div style={{ padding: 20, background: '#e0e0e0', marginTop: 20 }}>
      <h3>Nested Folders Component</h3>
      <pre data-testid="nested-output">{JSON.stringify(values, null, 2)}</pre>
    </div>
  )
}

const BaseTemplate: StoryFn<{ useStrictMode: boolean; delay?: number }> = ({ useStrictMode, delay = 100 }) => {
  const Wrapper = useStrictMode ? StrictMode : React.Fragment

  return (
    <Wrapper>
      <div>
        <div
          style={{
            padding: 10,
            background: useStrictMode ? '#fff3cd' : '#d1ecf1',
            border: `2px solid ${useStrictMode ? '#ffc107' : '#0dcaf0'}`,
            marginBottom: 20,
          }}>
          <strong>Mode: {useStrictMode ? 'StrictMode Enabled' : 'Normal Mode'}</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            {useStrictMode
              ? 'React StrictMode causes effects to run twice. Controls should still render correctly.'
              : 'Running in normal mode without StrictMode.'}
          </p>
        </div>
        <AsyncMountedComponent delay={delay} />
        <NestedFoldersComponent />
      </div>
    </Wrapper>
  )
}

export const WithStrictMode = BaseTemplate.bind({})
WithStrictMode.args = {
  useStrictMode: true,
  delay: 100,
}
WithStrictMode.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // Wait for the async component to mount
  await waitFor(
    () => {
      expect(canvas.getByText(/Async Mounted Component/i)).toBeInTheDocument()
    },
    { timeout: 3000 }
  )

  // Verify the Leva panel is rendered and visible
  await waitFor(
    () => {
      const levaPanel = within(document.body).queryByText(/Async Component/i)
      expect(levaPanel).toBeInTheDocument()
    },
    { timeout: 3000 }
  )

  // Verify controls are interactive - find a control by its label
  await waitFor(
    () => {
      const scaleInput = within(document.body).queryByLabelText(/scale/i)
      expect(scaleInput).toBeInTheDocument()
    },
    { timeout: 3000 }
  )

  // Verify nested folders are rendered
  await waitFor(
    () => {
      const nestedPanel = within(document.body).queryByText(/Nested Folders/i)
      expect(nestedPanel).toBeInTheDocument()
    },
    { timeout: 3000 }
  )
}

export const WithoutStrictMode = BaseTemplate.bind({})
WithoutStrictMode.args = {
  useStrictMode: false,
  delay: 100,
}
WithoutStrictMode.play = WithStrictMode.play

export const StrictModeWithSlowMount = BaseTemplate.bind({})
StrictModeWithSlowMount.args = {
  useStrictMode: true,
  delay: 500,
}
StrictModeWithSlowMount.parameters = {
  docs: {
    description: {
      story:
        'Tests the fix with a slower async mount to ensure controls render correctly even with delayed content layout.',
    },
  },
}

// Component that toggles between StrictMode and normal mode
export const InteractiveModeToggle: StoryFn = () => {
  const [strictMode, setStrictMode] = useState(true)
  const Wrapper = strictMode ? StrictMode : React.Fragment

  return (
    <div>
      <button
        onClick={() => setStrictMode((s) => !s)}
        style={{
          padding: '10px 20px',
          marginBottom: 20,
          fontSize: '16px',
          cursor: 'pointer',
          background: strictMode ? '#ffc107' : '#0dcaf0',
          border: 'none',
          borderRadius: '4px',
          color: '#000',
        }}>
        Toggle StrictMode (Currently: {strictMode ? 'ON' : 'OFF'})
      </button>
      <Wrapper key={strictMode ? 'strict' : 'normal'}>
        <AsyncMountedComponent delay={100} />
        <NestedFoldersComponent />
      </Wrapper>
    </div>
  )
}
InteractiveModeToggle.parameters = {
  docs: {
    description: {
      story: 'Interactive story that allows toggling between StrictMode and normal mode to verify the fix works in both cases.',
    },
  },
}
