/**
 * Example: Using Leva in Headless Mode
 *
 * This demonstrates how to use Leva's state management without
 * rendering the default HTML UI panel.
 */

import React, { useState } from 'react'
import { useControls as useControlsHeaded } from 'leva'
import { useControls, useLevaInputs, useLevaInput } from 'leva/headless'

export default function HeadlessDemo() {
  const [isHeadless, setIsHeadless] = useState(true)

  return (
    <div style={{ padding: 20, fontFamily: 'monospace' }}>
      <h2>Leva Headless Demo</h2>

      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setIsHeadless(!isHeadless)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginBottom: '20px',
            backgroundColor: isHeadless ? '#ff0055' : '#00ff55',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
          Switch to {isHeadless ? 'Headed' : 'Headless'} Mode
        </button>
        <p>
          <strong>Current Mode:</strong> {isHeadless ? 'Headless' : 'Headed'}
        </p>
        {!isHeadless && (
          <p style={{ color: '#666', fontSize: '14px' }}>
            <strong>Note:</strong> In Headed mode, the Leva panel should be visible (top-right). The custom UI below
            should disappear. If the panel persists when switching to headless mode, there's a bug.
          </p>
        )}
      </div>

      {isHeadless ? <HeadlessComponent /> : <HeadedComponent />}
    </div>
  )
}

function HeadlessComponent() {
  const values = useControls({
    name: 'World',
    count: { value: 0, min: 0, max: 10, step: 1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    color: '#ff0055',
    enabled: true,
  })

  const inputs = useLevaInputs()

  return (
    <>
      <div style={{ marginBottom: 40 }}>
        <h3>Current Values:</h3>
        <pre style={{ background: '#f0f0f0', padding: 10, borderRadius: 4 }}>{JSON.stringify(values, null, 2)}</pre>
      </div>

      <div>
        <h3>Custom UI Built from Metadata:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {inputs.map(({ path }) => (
            <CustomControl key={path} path={path} />
          ))}
        </div>
      </div>
    </>
  )
}

function HeadedComponent() {
  const values = useControlsHeaded({
    name: 'World',
    count: { value: 0, min: 0, max: 10, step: 1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    color: '#ff0055',
    enabled: true,
  })

  return (
    <div style={{ marginBottom: 40 }}>
      <h3>Current Values:</h3>
      <pre style={{ background: '#f0f0f0', padding: 10, borderRadius: 4 }}>{JSON.stringify(values, null, 2)}</pre>
      <p style={{ marginTop: 20, color: '#666', fontSize: '14px' }}>
        The Leva panel should be visible in the top-right corner. When you switch back to headless mode, this panel
        should disappear completely.
      </p>
    </div>
  )
}

// Custom control component that uses the headless input data
function CustomControl({ path }: { path: string }) {
  const levaInput = useLevaInput(path)

  if (!levaInput) return null

  const { input, set } = levaInput

  // Handle different input types with custom UI
  if ('value' in input) {
    const dataInput = input as any

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <label style={{ minWidth: 120 }}>{dataInput.label}:</label>

        {dataInput.type === 'NUMBER' && (
          <input
            type="range"
            value={dataInput.value}
            min={dataInput.settings?.min ?? 0}
            max={dataInput.settings?.max ?? 100}
            step={dataInput.settings?.step ?? 1}
            onChange={(e) => set(parseFloat(e.target.value))}
            style={{ flex: 1 }}
          />
        )}

        {dataInput.type === 'STRING' && (
          <input
            type="text"
            value={dataInput.value}
            onChange={(e) => set(e.target.value)}
            style={{ flex: 1, padding: 5 }}
          />
        )}

        {dataInput.type === 'BOOLEAN' && (
          <input type="checkbox" checked={dataInput.value} onChange={(e) => set(e.target.checked)} />
        )}

        {dataInput.type === 'COLOR' && (
          <input
            type="color"
            value={dataInput.value}
            onChange={(e) => set(e.target.value)}
            style={{ width: 60, height: 30 }}
          />
        )}

        <span style={{ minWidth: 60, textAlign: 'right', color: '#666' }}>{JSON.stringify(dataInput.value)}</span>
      </div>
    )
  }

  return null
}
