import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Reset from './components/decorator-reset'

import { Leva, useControls, useCreateStore, LevaPanel } from '../src'

export default {
  title: 'Dev/Hook/Clear on Unmount',
  decorators: [Reset],
} as Meta

// ---------------------------------------------------------------------------
// Per-input clearOnUnmount
// ---------------------------------------------------------------------------

const PerInputControls = () => {
  const values = useControls({
    persistent: { value: 10 },
    clearable: { value: 42, clearOnUnmount: true },
  })

  return (
    <div style={{ padding: 20, border: '1px solid #444', margin: '10px 0' }}>
      <p>
        <strong>persistent</strong> keeps its value across unmount/remount
      </p>
      <p>
        <strong>clearable</strong> resets to its initial value after unmount
      </p>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

/**
 * Only the input marked with `clearOnUnmount: true` resets when the component
 * unmounts. The other input retains its value.
 *
 * Steps to verify:
 * 1. Change both `persistent` and `clearable` in the panel.
 * 2. Click "Unmount" then "Mount".
 * 3. `persistent` should show the last value you set; `clearable` should be back to 42.
 */
export const PerInput: StoryFn = () => {
  const [mounted, toggle] = React.useState(true)

  return (
    <div>
      <button onClick={() => toggle((t) => !t)}>{mounted ? 'Unmount' : 'Mount'}</button>
      {mounted && <PerInputControls />}
    </div>
  )
}

PerInput.storyName = 'clearOnUnmount (per-input)'

// ---------------------------------------------------------------------------
// Panel-level clearOnUnmount via <Leva clearOnUnmount>
// ---------------------------------------------------------------------------

const PanelLevelControls = () => {
  const values = useControls({ num: 5, color: '#f00' })

  return (
    <div style={{ padding: 20, border: '1px solid #444', margin: '10px 0' }}>
      <p>All inputs clear on unmount because the panel has clearOnUnmount.</p>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

/**
 * When `<Leva clearOnUnmount>` is set, ALL inputs managed by the default panel
 * have their cached values discarded when they unmount, regardless of the
 * per-input `clearOnUnmount` setting.
 *
 * Steps to verify:
 * 1. Change `num` and `color` in the panel.
 * 2. Click "Unmount" then "Mount".
 * 3. Both values should be back to their initial defaults.
 */
export const PanelLevel: StoryFn = () => {
  const [mounted, toggle] = React.useState(true)

  return (
    <div>
      <Leva clearOnUnmount />
      <button onClick={() => toggle((t) => !t)}>{mounted ? 'Unmount' : 'Mount'}</button>
      {mounted && <PanelLevelControls />}
    </div>
  )
}

PanelLevel.storyName = 'clearOnUnmount (panel-level)'

// ---------------------------------------------------------------------------
// Panel-level clearOnUnmount overrides per-input false
// ---------------------------------------------------------------------------

const MixedControls = () => {
  const values = useControls({
    willClear: { value: 99 },
    alsoWillClear: { value: '#0f0', clearOnUnmount: false },
  })

  return (
    <div style={{ padding: 20, border: '1px solid #444', margin: '10px 0' }}>
      <p>Panel-level clearOnUnmount overrides per-input clearOnUnmount: false.</p>
      <pre>{JSON.stringify(values, null, '  ')}</pre>
    </div>
  )
}

/**
 * Panel-level `clearOnUnmount` takes priority over the per-input setting.
 * Even `alsoWillClear` (which sets `clearOnUnmount: false`) will be cleared
 * because the panel flag overrides it.
 */
export const PanelOverridesPerInput: StoryFn = () => {
  const [mounted, toggle] = React.useState(true)

  return (
    <div>
      <Leva clearOnUnmount />
      <button onClick={() => toggle((t) => !t)}>{mounted ? 'Unmount' : 'Mount'}</button>
      {mounted && <MixedControls />}
    </div>
  )
}

PanelOverridesPerInput.storyName = 'panel clearOnUnmount overrides per-input'

// ---------------------------------------------------------------------------
// store.clearPath — custom store, imperative usage
// ---------------------------------------------------------------------------

/**
 * `store.clearPath(path)` lets you imperatively discard the cached value of a
 * single input. This is useful when you manage your own store and want fine-
 * grained control over cache invalidation without unmounting the component.
 *
 * Click "Clear position cache" — the next time the component remounts it will
 * start from the initial value again.
 */
export const ClearPath: StoryFn = () => {
  const store = useCreateStore()

  const values = useControls({ position: { x: 0, y: 0 }, speed: 1 }, { store })

  return (
    <div>
      <LevaPanel store={store} />
      <div style={{ padding: 20, border: '1px solid #444', margin: '10px 0' }}>
        <p>
          <strong>store.clearPath</strong> imperatively discards a single cached input.
        </p>
        <pre>{JSON.stringify(values, null, '  ')}</pre>
      </div>
      <button
        onClick={() => {
          // Discard the cached position; next mount will use the initial value.
          store.clearPath('position')
        }}>
        Clear position cache
      </button>
    </div>
  )
}

ClearPath.storyName = 'store.clearPath (imperative)'
