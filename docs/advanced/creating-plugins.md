# Creating Plugins

Plugins allow you to extend Leva with custom input types. They're perfect for domain-specific controls like bezier curves, spring physics, date pickers, or any custom input type your application needs.

## Plugin Structure

A plugin is an object that implements the `Plugin` interface:

```tsx
import { Plugin } from 'leva/plugin'

interface MyPluginInput {
  value: number
  multiplier?: number
}

interface MyPluginSettings {
  multiplier: number
}

const myPlugin: Plugin<MyPluginInput, number, MyPluginSettings> = {
  component: MyComponent,
  normalize: (input) => ({
    value: input.value ?? 0,
    settings: { multiplier: input.multiplier ?? 1 },
  }),
  sanitize: (value) => Number(value),
  format: (value, settings) => (value * settings.multiplier).toFixed(2),
}
```

## Creating a Plugin

### Step 1: Use `createPlugin`

The `createPlugin` function creates a plugin factory function:

```tsx
import { createPlugin } from 'leva/plugin'

export const myPlugin = createPlugin<MyPluginInput, number, MyPluginSettings>({
  component: MyComponent,
  normalize: (input) => ({
    value: input.value ?? 0,
    settings: { multiplier: input.multiplier ?? 1 },
  }),
  sanitize: (value) => Number(value),
  format: (value, settings) => (value * settings.multiplier).toFixed(2),
})
```

### Step 2: Create the Component

Your component receives props from `useInputContext`:

```tsx
import { useInputContext, Components } from 'leva/plugin'
import type { LevaInputProps } from 'leva/plugin'

const { Row, Label, Number } = Components

interface MyPluginProps extends LevaInputProps<number, MyPluginSettings> {}

function MyComponent() {
  const { label, value, displayValue, onUpdate, settings } = useInputContext<MyPluginProps>()

  return (
    <Row input>
      <Label>{label}</Label>
      <Number value={displayValue} onUpdate={(v) => onUpdate(v / settings.multiplier)} />
      <span>× {settings.multiplier}</span>
    </Row>
  )
}
```

### Step 3: Use Your Plugin

```tsx
import { useControls } from 'leva'
import { myPlugin } from './my-plugin'

function MyApp() {
  const { value } = useControls({
    value: myPlugin({ value: 10, multiplier: 2 }),
  })

  return <div>{value}</div>
}
```

## Plugin Methods

### `component`

The React component that renders your input. It receives props through `useInputContext`.

```tsx
function MyComponent() {
  const props = useInputContext<MyPluginProps>()
  // Render your custom UI
  return <div>...</div>
}
```

### `normalize`

Converts the user input into a normalized `{ value, settings }` object. Called when the input is first registered.

```tsx
normalize: (input: MyPluginInput, path: string, data: Data) => {
  return {
    value: input.value ?? defaultValue,
    settings: {
      multiplier: input.multiplier ?? 1,
    },
  }
}
```

### `sanitize`

Validates and sanitizes the value before it's stored. Should throw if the value is invalid.

```tsx
sanitize: (value: any, settings: MyPluginSettings, prevValue: any, path: string, store: StoreType) => {
  const num = Number(value)
  if (isNaN(num)) {
    throw new Error('Invalid number')
  }
  return num
}
```

### `format`

Formats the value for display. The formatted value is available as `displayValue` in your component.

```tsx
format: (value: number, settings: MyPluginSettings) => {
  return (value * settings.multiplier).toFixed(2)
}
```

## Available Components

Leva provides pre-built components you can use in your plugins:

```tsx
import { Components } from 'leva/plugin'

const { Row, Label, Number, String, Boolean, Select, Vector, Portal, Overlay, InnerLabel } = Components
```

- `Row`: Container row with `input` prop for input rows
- `Label`: Input label component
- `Number`: Number input
- `String`: String input
- `Boolean`: Boolean toggle
- `Select`: Select dropdown
- `Vector`: Vector input (for x, y, z values)
- `Portal`: Portal for overlays
- `Overlay`: Overlay component
- `InnerLabel`: Inner label for inputs

## Available Hooks

```tsx
import {
  useDrag,
  useCanvas2d,
  useTransform,
  useInput,
  useValue,
  useValues,
  useInputSetters,
  useInputContext,
  useStoreContext,
} from 'leva/plugin'
```

- `useDrag`: Drag gesture hook (see hook docs)
- `useCanvas2d`: Canvas with auto-resize
- `useTransform`: CSS transform helper
- `useInput`: Access input data and methods
- `useValue`: Subscribe to a single value
- `useValues`: Subscribe to multiple values
- `useInputSetters`: Get setter functions
- `useInputContext`: Get current input context
- `useStoreContext`: Get current store

## Example: Simple Slider Plugin

```tsx
import { createPlugin, useInputContext, Components } from 'leva/plugin'
import type { LevaInputProps } from 'leva/plugin'

const { Row, Label, Number } = Components

interface SliderInput {
  value?: number
  min?: number
  max?: number
  step?: number
}

interface SliderSettings {
  min: number
  max: number
  step: number
}

function SliderComponent() {
  const { label, value, onUpdate, settings } = useInputContext<LevaInputProps<number, SliderSettings>>()

  return (
    <Row input>
      <Label>{label}</Label>
      <input
        type="range"
        min={settings.min}
        max={settings.max}
        step={settings.step}
        value={value}
        onChange={(e) => onUpdate(Number(e.target.value))}
      />
      <Number value={value} onUpdate={onUpdate} />
    </Row>
  )
}

export const slider = createPlugin<SliderInput, number, SliderSettings>({
  component: SliderComponent,
  normalize: (input) => ({
    value: input.value ?? 0,
    settings: {
      min: input.min ?? 0,
      max: input.max ?? 100,
      step: input.step ?? 1,
    },
  }),
  sanitize: (value) => {
    const num = Number(value)
    if (isNaN(num)) throw new Error('Invalid number')
    return num
  },
})
```

## Example: Using Vector Utilities

For plugins that work with vectors (like positions, colors, etc.):

```tsx
import { normalizeVector, sanitizeVector } from 'leva/plugin'

const normalize = (input) => {
  const defaultValue = { x: 0, y: 0 }
  const defaultSettings = {
    x: { min: -100, max: 100, step: 1 },
    y: { min: -100, max: 100, step: 1 },
  }
  return normalizeVector({ ...defaultValue, ...input.value }, defaultSettings)
}

const sanitize = (value, settings, prevValue) => {
  return sanitizeVector(value, settings, prevValue)
}
```

## TypeScript Support

Ensure your plugin types are properly exported:

```tsx
import type { Plugin, LevaInputProps } from 'leva/plugin'

export interface MyPluginInput {
  value: number
  multiplier?: number
}

export interface MyPluginSettings {
  multiplier: number
}

export type MyPluginProps = LevaInputProps<number, MyPluginSettings>
```

## Best Practices

1. **Normalize all inputs**: Always provide defaults in `normalize`
2. **Validate in sanitize**: Throw errors for invalid values
3. **Use provided components**: Leverage Leva's UI components for consistency
4. **Handle edge cases**: Consider empty, null, and undefined values
5. **Type everything**: Use TypeScript for better developer experience
6. **Test thoroughly**: Test with various input values and edge cases

## Sharing Plugins

To share your plugin:

1. Create a package with your plugin code
2. Export the plugin factory function
3. Document usage and examples
4. Consider publishing to npm (e.g., `@your-org/leva-plugin-name`)

## Complete Example

See the official plugins in the Leva repository for complete examples:

- `packages/plugin-bezier`
- `packages/plugin-spring`
- `packages/plugin-plot`
- `packages/plugin-dates`

These demonstrate real-world plugin implementations with complex interactions, canvas rendering, and advanced features.
