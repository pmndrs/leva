# Leva Headless

Headless mode allows you to use Leva's powerful state management and type-safe hooks without rendering the default HTML UI. This is perfect for:

- **WebXR/React-XR** - Build 3D UIs in immersive environments
- **React Three Fiber** - Create custom 3D control panels
- **Custom UI frameworks** - Use your own component library
- **Non-DOM environments** - Terminal UIs, native apps, etc.

## Installation

```bash
npm install leva
# or
yarn add leva
```

## Quick Start

```tsx
import { useControls, useLevaInputs } from 'leva/headless'

function MyComponent() {
  // useControls works exactly the same - it manages state without rendering UI
  const values = useControls({
    name: 'World',
    count: { value: 0, min: 0, max: 10 },
    color: '#ff0000',
  })

  // Get all inputs with metadata to build your custom UI
  const inputs = useLevaInputs()

  return (
    <div>
      {/* Your values are still reactive */}
      <p>
        Hello {values.name}! Count: {values.count}
      </p>

      {/* Build your own UI using the inputs data */}
      {inputs.map(({ path, input }) => (
        <CustomControl key={path} path={path} input={input} />
      ))}
    </div>
  )
}
```

## Core Concepts

### 1. useControls - State Management (No UI)

`useControls` works identically to the regular version, but doesn't auto-render the panel:

```tsx
const values = useControls({
  position: { value: [0, 0, 0], label: 'Position' },
  speed: { value: 1, min: 0, max: 10, step: 0.1 },
  enabled: true,
})
// values = { position: [0, 0, 0], speed: 1, enabled: true }
```

### 2. Accessing Input Metadata

Use headless hooks to get the raw input data with all metadata:

```tsx
import { useLevaInputs } from 'leva/headless'

const inputs = useLevaInputs()
// [
//   { path: 'position', input: { type: 'VECTOR3D', value: [0,0,0], settings: {...}, ... } },
//   { path: 'speed', input: { type: 'NUMBER', value: 1, settings: { min: 0, max: 10 }, ... } },
//   { path: 'enabled', input: { type: 'BOOLEAN', value: true, ... } },
// ]
```

### 3. Building Custom Controls

Each input has a `type` and `settings` that tell you how to render it:

```tsx
function CustomControl({ path, input }) {
  const { value, type, settings, set } = useLevaInput(path)

  switch (type) {
    case 'NUMBER':
      return <YourSlider value={value} min={settings.min} max={settings.max} onChange={set} />
    case 'BOOLEAN':
      return <YourToggle value={value} onChange={set} />
    case 'COLOR':
      return <YourColorPicker value={value} onChange={set} />
    // ... handle other types
  }
}
```

## Hooks Reference

### useControls(schema, [settings])

Same as the regular `useControls` hook. Manages state without rendering UI.

```tsx
const values = useControls({
  name: 'World',
  age: { value: 25, min: 0, max: 100 },
})
```

### useLevaInputs(store?)

Returns an array of all visible inputs with their metadata.

```tsx
const inputs = useLevaInputs()
// Array<{ path: string, input: DataInput }>
```

### useLevaTree(store?, filter?)

Returns the folder tree structure of inputs.

```tsx
const tree = useLevaTree()
// { folder1: { input1: {...}, input2: {...} }, input3: {...} }
```

### useLevaInput(path, store?)

Get a specific input by path with full control methods.

```tsx
const input = useLevaInput('myFolder.count')
// { value, type, settings, label, set, setSettings, disable, ... }
```

### useCreateStore()

Create a custom store instead of using the global one.

```tsx
const store = useCreateStore()
const values = useControls({ x: 1 }, { store })
const inputs = useLevaInputs(store)
```

## Input Types

Leva supports these input types (accessed via `input.type`):

- `NUMBER` - Numeric inputs with min/max/step
- `STRING` - Text inputs
- `BOOLEAN` - Toggle/checkbox
- `COLOR` - Color pickers (hex, rgb, hsl)
- `VECTOR2D` - 2D vectors [x, y]
- `VECTOR3D` - 3D vectors [x, y, z]
- `SELECT` - Dropdown selections
- `IMAGE` - Image upload
- `INTERVAL` - Range with min/max

Special types:

- `BUTTON` - Trigger actions
- `MONITOR` - Display read-only values
- `FOLDER` - Group controls

## React-XR Example

```tsx
import { useControls, useLevaInputs } from 'leva/headless'
import { Container, Text } from '@react-three/xr'

function XRControlPanel() {
  const values = useControls({
    speed: { value: 1, min: 0, max: 10 },
    color: '#ff0000',
    enabled: true,
  })

  const inputs = useLevaInputs()

  return (
    <Container position={[-1, 1.5, -1]}>
      {inputs.map(({ path, input }, i) => (
        <XRControl key={path} path={path} input={input} y={-i * 0.2} />
      ))}
    </Container>
  )
}

function XRControl({ path, input, y }) {
  const { value, type, settings, set } = useLevaInput(path)

  return (
    <group position={[0, y, 0]}>
      <Text position={[-0.5, 0, 0]}>{input.label}</Text>
      {type === 'NUMBER' && <XRSlider value={value} min={settings.min} max={settings.max} onChange={set} />}
      {/* ... other input types */}
    </group>
  )
}
```

## Advanced: Direct Store Access

For maximum control, access the Zustand store directly:

```tsx
import { levaStore } from 'leva/headless'

// Get all data
const data = levaStore.getData()

// Get specific value
const value = levaStore.get('myFolder.count')

// Set value
levaStore.set({ 'myFolder.count': 5 }, false)

// Subscribe to changes
const unsub = levaStore.useStore.subscribe(
  (state) => state.data['myFolder.count'],
  (input) => console.log('Changed:', input.value)
)
```

## TypeScript Support

All types are exported for full type safety:

```tsx
import type { DataInput, StoreType, Schema } from 'leva/headless'

const mySchema: Schema = {
  count: { value: 0, min: 0, max: 10 },
}

function useInput(path: string): DataInput | null {
  // ...
}
```

## Tips

1. **No UI renders automatically** - `useControls` won't create the panel when using `leva/headless`
2. **Store is shared** - Multiple `useControls` calls share state (like the regular version)
3. **Custom stores** - Use `useCreateStore()` for isolated state
4. **onChange still works** - You can still use `onChange` callbacks in schemas
5. **Tree structure** - Use `useLevaTree()` if you want to preserve folder hierarchy in your UI
