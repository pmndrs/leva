---
title: Creating Plugins
description: Build custom input types for Leva
---

Plugins allow you to create custom input types for Leva. This guide will teach you how to build your own plugins from scratch.

## What is a Plugin?

A Leva plugin is a custom input component that:

1. Displays a UI for editing values
2. Normalizes input data to a standard format
3. Formats values for display
4. Validates and sanitizes user input

## Plugin Structure

Plugins are created using the `createPlugin` function:

```jsx
import { createPlugin } from 'leva/plugin'

const myPlugin = createPlugin({
  component: MyInputComponent,
  normalize: (input) => ({ value, settings }),
  format: (value) => displayValue,
  sanitize: (value) => validatedValue,
})
```

## Basic Example

Let's create a simple "green or blue" color plugin:

```jsx
import { createPlugin, useInputContext, Components } from 'leva/plugin'

const { Row, Label, String } = Components

// 1. Component - The UI
function GreenOrBlue() {
  const { label, displayValue, onUpdate, onChange } = useInputContext()

  return (
    <Row input>
      <Label>{label}</Label>
      <String displayValue={displayValue} onUpdate={onUpdate} onChange={onChange} />
    </Row>
  )
}

// 2. Normalize - Convert input to standard format
const normalize = ({ color, light }) => {
  return {
    value: { color, light },
    settings: {},
  }
}

// 3. Sanitize - Validate input
const sanitize = (v) => {
  const validColors = ['green', 'blue', 'lightgreen', 'lightblue']
  if (!validColors.includes(v)) {
    throw Error('Invalid color')
  }

  const isLight = v.startsWith('light')
  const color = isLight ? v.slice(5) : v

  return { light: isLight, color }
}

// 4. Format - Convert value to display string
const format = (v) => {
  return (v.light ? 'light' : '') + v.color
}

// Create the plugin
const greenOrBlue = createPlugin({
  component: GreenOrBlue,
  normalize,
  sanitize,
  format,
})

// Use it
function App() {
  const { color } = useControls({
    color: greenOrBlue({ color: 'green', light: true }),
  })
}
```

## Plugin Functions

### Component

The React component that renders the input UI.

```jsx
function MyComponent() {
  const props = useInputContext()
  const {
    label, // Input label
    value, // Current value
    displayValue, // Formatted display value
    onUpdate, // Update during interaction
    onChange, // Commit change
    settings, // Plugin settings
    disabled, // Disabled state
  } = props

  return (
    <Row input>
      <Label>{label}</Label>
      {/* Your input UI */}
    </Row>
  )
}
```

### Normalize

Converts plugin input to Leva's standard format:

```jsx
const normalize = (input) => {
  return {
    value: /* the actual value */,
    settings: /* optional plugin settings */
  }
}
```

Example with settings:

```jsx
const normalize = ({ value, min = 0, max = 100 }) => {
  return {
    value: value,
    settings: { min, max },
  }
}
```

### Format

Converts the internal value to a display string:

```jsx
const format = (value) => {
  return String(value)
}
```

Example:

```jsx
// For a percentage plugin
const format = (value) => {
  return `${(value * 100).toFixed(0)}%`
}
```

### Sanitize

Validates and cleans input values:

```jsx
const sanitize = (value) => {
  // Validate
  if (typeof value !== 'number') {
    throw Error('Must be a number')
  }

  // Clean/transform
  return Math.max(0, Math.min(100, value))
}
```

## Built-in Components

Leva provides reusable UI components:

```jsx
import { Components } from 'leva/plugin'

const {
  Row, // Container row
  Label, // Input label
  String, // Text input
  Number, // Number input
  Boolean, // Checkbox
  Color, // Color picker
  Select, // Dropdown
  Vector, // Vector input
  // ... and more
} = Components
```

### Using Built-in Components

```jsx
import { Components } from 'leva/plugin'

function MyPlugin() {
  const { label, value, onUpdate } = useInputContext()
  const { Row, Label, Number } = Components

  return (
    <Row input>
      <Label>{label}</Label>
      <Number value={value} onUpdate={onUpdate} />
    </Row>
  )
}
```

## TypeScript Support

Add full type safety to your plugin:

```tsx
import { LevaInputProps } from 'leva/plugin'

// Define your types
type MyValue = { x: number; y: number }
type MySettings = { min?: number; max?: number }
type MyInput = MyValue & MySettings

type MyProps = LevaInputProps<MyValue, MySettings, string>

function MyPlugin() {
  const props = useInputContext<MyProps>()
  // props is now fully typed
}
```

## Advanced Example: Percentage Plugin

A complete plugin with custom UI:

```jsx
import { createPlugin, useInputContext, Components } from 'leva/plugin'

const { Row, Label } = Components

function PercentageInput() {
  const { label, value, onUpdate, onChange, settings } = useInputContext()

  const handleChange = (e) => {
    const percent = parseFloat(e.target.value) / 100
    onUpdate(percent)
  }

  const handleBlur = () => {
    onChange(value)
  }

  return (
    <Row input>
      <Label>{label}</Label>
      <input
        type="range"
        min={settings.min * 100}
        max={settings.max * 100}
        value={value * 100}
        onChange={handleChange}
        onPointerUp={handleBlur}
      />
      <span>{(value * 100).toFixed(0)}%</span>
    </Row>
  )
}

const normalize = ({ value = 0.5, min = 0, max = 1 }) => {
  return {
    value: Math.max(min, Math.min(max, value)),
    settings: { min, max },
  }
}

const format = (value) => {
  return `${(value * 100).toFixed(0)}%`
}

const sanitize = (value) => {
  if (typeof value !== 'number') throw Error('Must be a number')
  return Math.max(0, Math.min(1, value))
}

export const percentage = createPlugin({
  component: PercentageInput,
  normalize,
  format,
  sanitize,
})

// Usage
const { opacity } = useControls({
  opacity: percentage({ value: 0.5, min: 0, max: 1 }),
})
```

## Custom Styling

Add custom styles to your plugin:

```jsx
import styled from 'styled-components'

const StyledInput = styled.input`
  background: #2a2a2a;
  border: 1px solid #444;
  color: #fff;
  padding: 4px 8px;
  border-radius: 2px;

  &:focus {
    outline: none;
    border-color: #0066dc;
  }
`

function MyPlugin() {
  return (
    <Row input>
      <Label>My Input</Label>
      <StyledInput />
    </Row>
  )
}
```

## State Management

For complex interactions, use React hooks:

```jsx
import { useState, useCallback } from 'react'

function ComplexPlugin() {
  const { value, onUpdate, onChange } = useInputContext()
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    onChange(value)
  }, [value, onChange])

  return (
    <div onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
      {/* Interactive UI */}
    </div>
  )
}
```

## Best Practices

1. **Keep it simple**: Start with minimal functionality
2. **Use built-in components**: Leverage Leva's UI library
3. **Validate input**: Always sanitize user input
4. **Handle edge cases**: Test with invalid/extreme values
5. **Type everything**: Use TypeScript for better DX
6. **Document usage**: Provide clear examples
7. **Performance**: Use `onChange` for commits, `onUpdate` for live updates

## Publishing

To share your plugin:

1. Create an npm package
2. Include `leva-plugin` in package keywords
3. Document installation and usage
4. Provide TypeScript types
5. Add examples

Example `package.json`:

```json
{
  "name": "@your-org/leva-plugin-name",
  "version": "1.0.0",
  "keywords": ["leva", "leva-plugin", "gui"],
  "peerDependencies": {
    "leva": ">=0.9.0",
    "react": ">=16.8.0"
  }
}
```

## Examples

See these plugins for reference:

- [@leva-ui/plugin-bezier](/plugins/bezier/) - Interactive curve editor
- [@leva-ui/plugin-spring](/plugins/spring/) - Spring physics config
- [@leva-ui/plugin-plot](/plugins/plot/) - Data visualization
- [@leva-ui/plugin-dates](/plugins/dates/) - Date/time picker

## Next Steps

- See [Custom Plugin Example](/advanced/custom-plugin/)
- Study the [official plugins source](https://github.com/pmndrs/leva/tree/main/packages)
- Join the [Discord community](https://discord.gg/poimandres) for help
