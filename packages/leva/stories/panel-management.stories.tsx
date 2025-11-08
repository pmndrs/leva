import React from 'react'
import Reset from './components/decorator-reset'
import { Meta } from '@storybook/react'
import { LevaPanel, useControls, useCreateStore } from '../src'

export default {
  title: 'Advanced/Panel Management',
  decorators: [Reset],
} as Meta

/**
 * Multiple Leva panels arranged in a grid with toggle controls.
 * Uses Leva to control Leva panels! Tests that panels can be shown/hidden without creating duplicates.
 */
export const MultiplePanelsWithToggle = () => {
  // Use Leva to control which panels are visible
  const { showPanel1, showPanel2, showPanel3, showPanel4 } = useControls('Visibility', {
    showPanel1: { value: true, label: 'Panel 1' },
    showPanel2: { value: true, label: 'Panel 2' },
    showPanel3: { value: true, label: 'Panel 3' },
    showPanel4: { value: true, label: 'Panel 4' },
  })

  // Create custom stores for each panel
  const store1 = useCreateStore()
  const store2 = useCreateStore()
  const store3 = useCreateStore()
  const store4 = useCreateStore()

  // Controls for each panel
  useControls('Panel 1 Data', { x: 0, y: 0, z: 0 }, { store: store1 })
  useControls('Panel 2 Data', { rotation: 0, scale: 1 }, { store: store2 })
  useControls('Panel 3 Data', { color: '#ff0000', opacity: 1 }, { store: store3 })
  useControls('Panel 4 Data', { enabled: true, speed: 5 }, { store: store4 })

  const activeCount = [showPanel1, showPanel2, showPanel3, showPanel4].filter(Boolean).length

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
        padding: 20,
        height: 'calc(100vh - 40px)',
        boxSizing: 'border-box',
      }}>
      {/* Panel 1 */}
      <div style={{ position: 'relative', minHeight: 200 }}>
        {showPanel1 ? (
          <LevaPanel store={store1} fill flat titleBar={{ title: 'Panel 1', filter: false }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f5f5f5',
              border: '2px dashed #ccc',
              borderRadius: 8,
              color: '#999',
            }}>
            Panel 1 Hidden
          </div>
        )}
      </div>

      {/* Panel 2 */}
      <div style={{ position: 'relative', minHeight: 200 }}>
        {showPanel2 ? (
          <LevaPanel store={store2} fill flat titleBar={{ title: 'Panel 2', filter: false }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f5f5f5',
              border: '2px dashed #ccc',
              borderRadius: 8,
              color: '#999',
            }}>
            Panel 2 Hidden
          </div>
        )}
      </div>

      {/* Panel 3 */}
      <div style={{ position: 'relative', minHeight: 200 }}>
        {showPanel3 ? (
          <LevaPanel store={store3} fill flat titleBar={{ title: 'Panel 3', filter: false }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f5f5f5',
              border: '2px dashed #ccc',
              borderRadius: 8,
              color: '#999',
            }}>
            Panel 3 Hidden
          </div>
        )}
      </div>

      {/* Panel 4 */}
      <div style={{ position: 'relative', minHeight: 200 }}>
        {showPanel4 ? (
          <LevaPanel store={store4} fill flat titleBar={{ title: 'Panel 4', filter: false }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f5f5f5',
              border: '2px dashed #ccc',
              borderRadius: 8,
              color: '#999',
            }}>
            Panel 4 Hidden
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'white',
          padding: '10px 20px',
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          fontSize: 14,
          color: '#666',
        }}>
        Active Panels: {activeCount} / 4
      </div>
    </div>
  )
}

MultiplePanelsWithToggle.storyName = 'Multiple Panels with Toggle'
