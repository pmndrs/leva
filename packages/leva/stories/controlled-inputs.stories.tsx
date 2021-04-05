import React from 'react'
import { Meta } from '@storybook/react'
import Reset from './components/decorator-reset'

import { useControls } from '../src'

export default {
  title: 'Misc/Controlled inputs',
  decorators: [Reset],
} as Meta

const formStyles: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.5em' }

export const ExternalUpdatesWithSet = () => {
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
