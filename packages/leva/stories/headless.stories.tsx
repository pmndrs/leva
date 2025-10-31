import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Reset from './components/decorator-reset'
import { folder, useControls as useControlsHeaded, LevaPanel } from '../src'
import { useControls, useLevaInputs, useLevaInput, useLevaTree, useCreateStore } from '../src/headless'
import type { DataInput } from '../src/types/internal'

export default {
  title: 'Advanced/Headless Mode',
  decorators: [Reset],
} as Meta

const styles = {
  container: { padding: '2em', fontFamily: 'monospace' },
  section: { marginBottom: '2em' },
  pre: { background: '#f0f0f0', padding: '1em', borderRadius: '4px', overflow: 'auto' },
  controlRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  label: { minWidth: '120px' },
}

export const BasicUsage: StoryFn = () => {
  // useControls works without rendering UI
  const values = useControls({
    name: 'World',
    count: { value: 0, min: 0, max: 10, step: 1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    color: '#ff0055',
    enabled: true,
  })

  return (
    <div style={styles.container}>
      <h2>Headless Mode - Basic Usage</h2>
      <p>Note: No Leva panel renders, but state is still managed.</p>
      <div style={styles.section}>
        <h3>Current Values:</h3>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  )
}

export const CustomUIWithInputs: StoryFn = () => {
  const values = useControls({
    name: 'World',
    count: { value: 0, min: 0, max: 10, step: 1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    color: '#ff0055',
    enabled: true,
  })

  const inputs = useLevaInputs()

  return (
    <div style={styles.container}>
      <h2>Custom UI Built from Metadata</h2>
      <div style={styles.section}>
        <h3>Current Values:</h3>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <div style={styles.section}>
        <h3>Custom Controls:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {inputs.map(({ path }) => (
            <CustomControl key={path} path={path} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CustomControl({ path }: { path: string }) {
  const levaInput = useLevaInput(path)

  if (!levaInput) return null

  const { input, set } = levaInput

  // Type guard: check if it's a DataInput with value property
  if ('value' in input) {
    const dataInput = input as DataInput

    return (
      <div style={styles.controlRow}>
        <label style={styles.label}>{dataInput.label || path}:</label>

        {dataInput.type === 'NUMBER' && (
          <>
            <input
              type="range"
              value={dataInput.value as number}
              min={(dataInput.settings as any)?.min ?? 0}
              max={(dataInput.settings as any)?.max ?? 100}
              step={(dataInput.settings as any)?.step ?? 1}
              onChange={(e) => set(parseFloat(e.target.value))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              value={dataInput.value as number}
              min={(dataInput.settings as any)?.min}
              max={(dataInput.settings as any)?.max}
              step={(dataInput.settings as any)?.step ?? 1}
              onChange={(e) => set(parseFloat(e.target.value))}
              style={{ width: '80px' }}
            />
          </>
        )}

        {dataInput.type === 'STRING' && (
          <input
            type="text"
            value={dataInput.value as string}
            onChange={(e) => set(e.target.value)}
            style={{ flex: 1, padding: '5px' }}
          />
        )}

        {dataInput.type === 'BOOLEAN' && (
          <input type="checkbox" checked={dataInput.value as boolean} onChange={(e) => set(e.target.checked)} />
        )}

        {dataInput.type === 'COLOR' && (
          <input
            type="color"
            value={dataInput.value as string}
            onChange={(e) => set(e.target.value)}
            style={{ width: '60px', height: '30px' }}
          />
        )}

        <span style={{ minWidth: '60px', textAlign: 'right', color: '#666' }}>{JSON.stringify(dataInput.value)}</span>
      </div>
    )
  }

  return null
}

export const TreeStructure: StoryFn = () => {
  const values = useControls({
    topLevel: 'value',
    myFolder: folder({
      x: { value: 0, min: 0, max: 10 },
      y: true,
      nestedFolder: folder({
        z: '#ff0000',
        w: { value: 5, min: 0, max: 20 },
      }),
    }),
  })

  const tree = useLevaTree()

  return (
    <div style={styles.container}>
      <h2>Folder Tree Structure</h2>
      <div style={styles.section}>
        <h3>Current Values:</h3>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <div style={styles.section}>
        <h3>Tree Structure:</h3>
        <pre style={styles.pre}>{JSON.stringify(tree, null, 2)}</pre>
      </div>
      <div style={styles.section}>
        <p>Use this to build hierarchical UIs that preserve folder structure.</p>
      </div>
    </div>
  )
}

export const IndividualInputAccess: StoryFn = () => {
  useControls({
    count: { value: 0, min: 0, max: 10 },
    name: 'Hello',
    enabled: true,
  })

  const countInput = useLevaInput('count')
  const nameInput = useLevaInput('name')
  const enabledInput = useLevaInput('enabled')

  return (
    <div style={styles.container}>
      <h2>Individual Input Access</h2>
      <div style={styles.section}>
        <h3>Access specific inputs by path:</h3>
        {countInput && 'value' in countInput.input && (
          <div style={{ marginBottom: '15px' }}>
            <h4>Count Input:</h4>
            <pre style={styles.pre}>
              {JSON.stringify(
                {
                  path: countInput.path,
                  value: (countInput.input as DataInput).value,
                  type: countInput.input.type,
                  settings: (countInput.input as DataInput).settings,
                },
                null,
                2
              )}
            </pre>
            <button onClick={() => countInput.set(((countInput.input as DataInput).value as number) + 1)}>
              Increment Count
            </button>
          </div>
        )}
        {nameInput && 'value' in nameInput.input && (
          <div style={{ marginBottom: '15px' }}>
            <h4>Name Input:</h4>
            <pre style={styles.pre}>
              {JSON.stringify(
                {
                  path: nameInput.path,
                  value: (nameInput.input as DataInput).value,
                  type: nameInput.input.type,
                },
                null,
                2
              )}
            </pre>
            <input
              type="text"
              value={(nameInput.input as DataInput).value as string}
              onChange={(e) => nameInput.set(e.target.value)}
            />
          </div>
        )}
        {enabledInput && 'value' in enabledInput.input && (
          <div style={{ marginBottom: '15px' }}>
            <h4>Enabled Input:</h4>
            <pre style={styles.pre}>
              {JSON.stringify(
                {
                  path: enabledInput.path,
                  value: (enabledInput.input as DataInput).value,
                  type: enabledInput.input.type,
                },
                null,
                2
              )}
            </pre>
            <input
              type="checkbox"
              checked={(enabledInput.input as DataInput).value as boolean}
              onChange={(e) => enabledInput.set(e.target.checked)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export const CustomStore: StoryFn = () => {
  const customStore = useCreateStore()

  const values1 = useControls({ x: 1, y: 2 }, { store: customStore })
  const values2 = useControls({ z: 3 }, { store: customStore })

  const inputs = useLevaInputs(customStore)

  return (
    <div style={styles.container}>
      <h2>Custom Store Isolation</h2>
      <div style={styles.section}>
        <h3>Values from custom store:</h3>
        <pre style={styles.pre}>{JSON.stringify({ ...values1, ...values2 }, null, 2)}</pre>
      </div>
      <div style={styles.section}>
        <h3>Inputs in custom store:</h3>
        <pre style={styles.pre}>
          {JSON.stringify(
            inputs
              .map(({ path, input }) => ({
                path,
                type: input.type,
                value: 'value' in input ? (input as DataInput).value : undefined,
              }))
              .filter((item) => item.value !== undefined),
            null,
            2
          )}
        </pre>
      </div>
      <div style={styles.section}>
        <p>This store is isolated from the global store - changes here won't affect other stories.</p>
      </div>
    </div>
  )
}

export const WithFolders: StoryFn = () => {
  const values = useControls({
    topLevel: 'visible',
    folder1: folder({
      x: { value: 0, min: 0, max: 10 },
      y: true,
    }),
    folder2: folder(
      {
        z: '#ff0000',
        w: { value: 5, min: 0, max: 20 },
      },
      { collapsed: true }
    ),
  })

  const inputs = useLevaInputs()

  return (
    <div style={styles.container}>
      <h2>Headless Mode with Folders</h2>
      <div style={styles.section}>
        <h3>Values:</h3>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <div style={styles.section}>
        <h3>All Inputs (paths include folder structure):</h3>
        <pre style={styles.pre}>
          {JSON.stringify(
            inputs
              .map(({ path, input }) => ({
                path,
                type: input.type,
                value: 'value' in input ? (input as DataInput).value : undefined,
              }))
              .filter((item) => item.value !== undefined),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}

export const HeadlessToHeadedSwitch: StoryFn = () => {
  const [isHeadless, setIsHeadless] = useState(true)

  return (
    <div style={styles.container}>
      <h2>Headless to Headed Switch</h2>
      <div style={styles.section}>
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
        <p>
          When switching to Headed mode, the custom headless UI below should disappear completely. The headless hooks
          should be cleaned up when switching to headed mode.
        </p>
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
      <div style={styles.section}>
        <h3>Current Values:</h3>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>

      <div style={styles.section}>
        <h3>Custom Headless UI (should disappear in headed mode):</h3>
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
    <>
      <div style={styles.section}>
        <h3>Current Values:</h3>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>

      <div style={styles.section}>
        <div
          style={{
            padding: '15px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
          }}>
          <strong>Note:</strong> You're in Headed mode now. The Leva panel should be visible (top-right). The custom
          headless UI above should be completely gone. If you still see custom controls or if there are duplicate inputs
          in the Leva panel, that's the bug - the headless hooks aren't being properly cleaned up.
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          <p>
            <strong>Expected:</strong> Only the Leva panel should be visible, no custom UI below.
          </p>
          <p>
            <strong>Bug symptoms:</strong> Custom UI still visible, duplicate inputs, or inputs not updating properly.
          </p>
        </div>
      </div>
    </>
  )
}

HeadlessToHeadedSwitch.storyName = 'Headless to Headed Switch'

export const HeadlessHooks: StoryFn = () => {
  // Set up the same controls as other stories
  useControls({
    name: 'World',
    count: { value: 0, min: 0, max: 10, step: 1 },
    speed: { value: 1, min: 0.1, max: 5, step: 0.1 },
    color: '#ff0055',
    enabled: true,
    position: folder({
      x: { value: 0, min: -10, max: 10 },
      y: { value: 0, min: -10, max: 10 },
    }),
  })

  // Get all inputs using useLevaInputs
  const inputs = useLevaInputs()

  // Get tree structure using useLevaTree
  const tree = useLevaTree()

  return (
    <div style={styles.container}>
      <h2>Using Leva Headless Hooks</h2>
      <p>This story demonstrates how to use useLevaInputs, useLevaInput, and useLevaTree hooks.</p>

      <div style={styles.section}>
        <h3>1. useLevaInputs() - Get All Inputs</h3>
        <p>Returns an array of all visible inputs with their metadata:</p>
        <pre style={styles.pre}>
          {JSON.stringify(
            inputs.map(({ path, input }) => ({
              path,
              type: input.type,
              value: 'value' in input ? (input as DataInput).value : undefined,
              label: input.label,
            })),
            null,
            2
          )}
        </pre>
      </div>

      <div style={styles.section}>
        <h3>2. useLevaTree() - Get Folder Tree Structure</h3>
        <p>Returns the hierarchical folder structure:</p>
        <pre style={styles.pre}>{JSON.stringify(tree, null, 2)}</pre>
      </div>

      <div style={styles.section}>
        <h3>3. useLevaInput(path) - Get Individual Input</h3>
        <p>Get a specific input by path with full control methods:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {inputs
            .filter(({ path }) => !path.includes('.'))
            .map(({ path }) => (
              <InputDetails key={path} path={path} />
            ))}
        </div>
      </div>

      <div style={styles.section}>
        <h3>4. Building Custom UI from Hooks</h3>
        <p>Use these hooks to build your own custom UI:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 15 }}>
          {inputs.map(({ path }) => (
            <CustomControl key={path} path={path} />
          ))}
        </div>
      </div>
    </div>
  )
}

function InputDetails({ path }: { path: string }) {
  const levaInput = useLevaInput(path)

  if (!levaInput || !('value' in levaInput.input)) return null

  const dataInput = levaInput.input as DataInput

  return (
    <div
      style={{
        padding: '10px',
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}>
      <strong>{path}:</strong>
      <pre style={{ margin: '5px 0', fontSize: '12px', background: '#fff', padding: '5px' }}>
        {JSON.stringify(
          {
            path: levaInput.path,
            type: dataInput.type,
            value: dataInput.value,
            label: dataInput.label,
            settings: dataInput.settings,
            hasSet: typeof levaInput.set === 'function',
            hasSetSettings: typeof levaInput.setSettings === 'function',
            hasDisable: typeof levaInput.disable === 'function',
          },
          null,
          2
        )}
      </pre>
      <div style={{ marginTop: '5px' }}>
        <button
          onClick={() => {
            if (dataInput.type === 'NUMBER') {
              levaInput.set(((dataInput.value as number) + 1) % 11)
            } else if (dataInput.type === 'BOOLEAN') {
              levaInput.set(!dataInput.value)
            } else if (dataInput.type === 'STRING') {
              levaInput.set((dataInput.value as string) + '!')
            }
          }}
          style={{ padding: '5px 10px', fontSize: '12px', cursor: 'pointer' }}>
          Test set()
        </button>
      </div>
    </div>
  )
}

HeadlessHooks.storyName = 'Headless Hooks'

export const MixedHeadedAndHeadless: StoryFn = () => {
  // Create two separate stores - one for headed, one for headless
  const headedStore = useCreateStore()
  const headlessStore = useCreateStore()

  return (
    <>
      {/* Render LevaPanel for the headed store */}
      <LevaPanel store={headedStore} />

      <div style={styles.container}>
        <h2>Mixing Headed and Headless with Separate Stores</h2>
        <p>
          This story demonstrates using both headed and headless modes simultaneously by using separate stores. Only one
          Leva panel should be visible (for the headed store), showing only the headed controls.
        </p>

        <div style={styles.section}>
          <div
            style={{
              padding: '15px',
              backgroundColor: '#e7f3ff',
              border: '1px solid #2196F3',
              borderRadius: '4px',
              marginBottom: '20px',
            }}>
            <strong>Note:</strong> Check the top-right corner - you should see a Leva panel with only the "Headed
            Controls" (name, count, enabled). The headless controls (speed, color) should NOT appear in the panel, but
            they should be visible in the custom UI below.
          </div>
        </div>

        <HeadedControls store={headedStore} />
        <HeadlessControls store={headlessStore} />
      </div>
    </>
  )
}

function HeadedControls({ store }: { store: ReturnType<typeof useCreateStore> }) {
  const values = useControlsHeaded(
    {
      name: 'Headed Name',
      count: { value: 5, min: 0, max: 10, step: 1 },
      enabled: true,
    },
    { store }
  )

  const inputs = useLevaInputs(store)

  return (
    <div style={styles.section}>
      <h3>Headed Controls (visible in Leva panel)</h3>
      <p>These controls use a headed store and should appear in the Leva panel:</p>
      <div style={{ marginBottom: '15px' }}>
        <strong>Values:</strong>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <div>
        <strong>Inputs in headed store:</strong>
        <pre style={styles.pre}>
          {JSON.stringify(
            inputs.map(({ path, input }) => ({
              path,
              type: input.type,
              value: 'value' in input ? (input as DataInput).value : undefined,
            })),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  )
}

function HeadlessControls({ store }: { store: ReturnType<typeof useCreateStore> }) {
  const values = useControls(
    {
      speed: { value: 2, min: 0.1, max: 5, step: 0.1 },
      color: '#00ff00',
    },
    { store }
  )

  const inputs = useLevaInputs(store)

  return (
    <div style={styles.section}>
      <h3>Headless Controls (custom UI only)</h3>
      <p>These controls use a headless store and should NOT appear in the Leva panel:</p>
      <div style={{ marginBottom: '15px' }}>
        <strong>Values:</strong>
        <pre style={styles.pre}>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <div>
        <strong>Custom UI built from headless store:</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 15 }}>
          {inputs.map(({ path }) => (
            <CustomControlWithStore key={path} path={path} store={store} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CustomControlWithStore({ path, store }: { path: string; store: ReturnType<typeof useCreateStore> }) {
  const levaInput = useLevaInput(path, store)

  if (!levaInput) return null

  const { input, set } = levaInput

  if ('value' in input) {
    const dataInput = input as DataInput

    return (
      <div style={styles.controlRow}>
        <label style={styles.label}>{dataInput.label || path}:</label>

        {dataInput.type === 'NUMBER' && (
          <>
            <input
              type="range"
              value={dataInput.value as number}
              min={(dataInput.settings as any)?.min ?? 0}
              max={(dataInput.settings as any)?.max ?? 100}
              step={(dataInput.settings as any)?.step ?? 1}
              onChange={(e) => set(parseFloat(e.target.value))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              value={dataInput.value as number}
              min={(dataInput.settings as any)?.min}
              max={(dataInput.settings as any)?.max}
              step={(dataInput.settings as any)?.step ?? 1}
              onChange={(e) => set(parseFloat(e.target.value))}
              style={{ width: '80px' }}
            />
          </>
        )}

        {dataInput.type === 'STRING' && (
          <input
            type="text"
            value={dataInput.value as string}
            onChange={(e) => set(e.target.value)}
            style={{ flex: 1, padding: '5px' }}
          />
        )}

        {dataInput.type === 'BOOLEAN' && (
          <input type="checkbox" checked={dataInput.value as boolean} onChange={(e) => set(e.target.checked)} />
        )}

        {dataInput.type === 'COLOR' && (
          <input
            type="color"
            value={dataInput.value as string}
            onChange={(e) => set(e.target.value)}
            style={{ width: '60px', height: '30px' }}
          />
        )}

        <span style={{ minWidth: '60px', textAlign: 'right', color: '#666' }}>{JSON.stringify(dataInput.value)}</span>
      </div>
    )
  }

  return null
}

MixedHeadedAndHeadless.storyName = 'Mixed: Headed + Headless Stores'
