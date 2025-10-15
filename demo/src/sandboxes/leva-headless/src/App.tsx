/**
 * Example: Using Leva in Headless Mode
 *
 * This demonstrates how to use Leva's state management without
 * rendering the default HTML UI panel.
 */

import React from 'react'
import { useControls, useLevaInputs, useLevaInput } from 'leva/headless'

export default function HeadlessDemo() {
  // useControls manages state without rendering any UI
  const values = useControls({
    name: 'World',
    count: { value: 0, min: 0, max: 10, step: 1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    color: '#ff0055',
    enabled: true,
  })

  // Get all inputs with full metadata
  const inputs = useLevaInputs()

  return (
    <div style={{ padding: 20, fontFamily: 'monospace' }}>
      <h2>Leva Headless Demo</h2>

      <div style={{ marginBottom: 40 }}>
        <h3>Current Values:</h3>
        <pre style={{ background: '#f0f0f0', padding: 10, borderRadius: 4 }}>{JSON.stringify(values, null, 2)}</pre>
      </div>

      <div>
        <h3>Custom UI Built from Metadata:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {inputs.map(({ path, input }) => (
            <CustomControl key={path} path={path} />
          ))}
        </div>
      </div>
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
