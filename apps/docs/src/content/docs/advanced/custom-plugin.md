---
title: Custom Plugin Development
description: Complete guide to building a custom Leva plugin
---

This guide walks through building a complete custom plugin from scratch: a percentage input with a slider and text display.

## Planning the Plugin

Our percentage plugin will:

- Accept values from 0 to 1
- Display as 0% to 100%
- Show a slider and percentage text
- Support custom min/max ranges
- Validate input

## Setting Up

```bash
npm install leva react react-dom
```

Create a new file `percentage-plugin.tsx`:

```tsx
import { createPlugin, useInputContext, LevaInputProps } from 'leva/plugin'
```

## Define Types

```tsx
// The internal value (0-1)
type PercentageValue = number

// Plugin settings
type PercentageSettings = {
  min?: number
  max?: number
}

// Combined input type
type PercentageInput = {
  value?: number
} & PercentageSettings

// Component props
type PercentageProps = LevaInputProps<PercentageValue, PercentageSettings, string>
```

## Create the Component

```tsx
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`

const Slider = styled.input`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #3a3a3a;
  outline: none;

  &::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #0066dc;
    cursor: pointer;
  }

  &:hover::-webkit-slider-thumb {
    background: #0052b3;
  }
`

const Display = styled.div`
  min-width: 45px;
  text-align: right;
  font-size: 11px;
  color: #bbb;
  user-select: none;
`

function PercentageComponent() {
  const { value, displayValue, onUpdate, onChange, settings } = useInputContext<PercentageProps>()

  const { min = 0, max = 1 } = settings
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    onUpdate(newValue)
  }

  const handlePointerDown = () => {
    setIsDragging(true)
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    onChange(value)
  }

  return (
    <Container>
      <Slider
        type="range"
        min={min}
        max={max}
        step={0.01}
        value={value}
        onChange={handleChange}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      <Display>{displayValue}</Display>
    </Container>
  )
}
```

## Implement normalize

Converts input to standard format:

```tsx
const normalize = (input: PercentageInput) => {
  const { value = 0.5, min = 0, max = 1 } = input

  // Clamp value to range
  const clamped = Math.max(min, Math.min(max, value))

  return {
    value: clamped,
    settings: { min, max },
  }
}
```

## Implement format

Converts value to display string:

```tsx
const format = (value: PercentageValue): string => {
  return `${Math.round(value * 100)}%`
}
```

## Implement sanitize

Validates input:

```tsx
const sanitize = (value: any): PercentageValue => {
  // Ensure it's a number
  const num = typeof value === 'number' ? value : parseFloat(value)

  if (isNaN(num)) {
    throw new Error('Percentage must be a number')
  }

  // Clamp to 0-1
  return Math.max(0, Math.min(1, num))
}
```

## Create the Plugin

```tsx
export const percentage = createPlugin<PercentageInput, PercentageValue, PercentageSettings>({
  component: PercentageComponent,
  normalize,
  format,
  sanitize,
})
```

## Complete Plugin Code

Here's the full `percentage-plugin.tsx`:

```tsx
import { createPlugin, useInputContext, LevaInputProps } from 'leva/plugin'
import { useState } from 'react'
import styled from 'styled-components'

// Types
type PercentageValue = number
type PercentageSettings = { min?: number; max?: number }
type PercentageInput = { value?: number } & PercentageSettings
type PercentageProps = LevaInputProps<PercentageValue, PercentageSettings, string>

// Styled Components
const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`

const Slider = styled.input`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #3a3a3a;
  outline: none;

  &::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #0066dc;
    cursor: pointer;
  }
`

const Display = styled.div`
  min-width: 45px;
  text-align: right;
  font-size: 11px;
  color: #bbb;
`

// Component
function PercentageComponent() {
  const { value, displayValue, onUpdate, onChange, settings } = useInputContext<PercentageProps>()

  const { min = 0, max = 1 } = settings
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Container>
      <Slider
        type="range"
        min={min}
        max={max}
        step={0.01}
        value={value}
        onChange={(e) => onUpdate(parseFloat(e.target.value))}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => {
          setIsDragging(false)
          onChange(value)
        }}
      />
      <Display>{displayValue}</Display>
    </Container>
  )
}

// Plugin functions
const normalize = ({ value = 0.5, min = 0, max = 1 }: PercentageInput) => ({
  value: Math.max(min, Math.min(max, value)),
  settings: { min, max },
})

const format = (value: PercentageValue) => `${Math.round(value * 100)}%`

const sanitize = (value: any) => {
  const num = typeof value === 'number' ? value : parseFloat(value)
  if (isNaN(num)) throw new Error('Must be a number')
  return Math.max(0, Math.min(1, num))
}

// Export plugin
export const percentage = createPlugin<PercentageInput, PercentageValue, PercentageSettings>({
  component: PercentageComponent,
  normalize,
  format,
  sanitize,
})
```

## Using the Plugin

```tsx
import { useControls } from 'leva'
import { percentage } from './percentage-plugin'

function App() {
  const { opacity, volume } = useControls({
    opacity: percentage({ value: 0.8 }),
    volume: percentage({
      value: 0.5,
      min: 0,
      max: 1,
    }),
  })

  return <div style={{ opacity }}>Volume: {Math.round(volume * 100)}%</div>
}
```

## Adding Options

Extend with additional features:

```tsx
type PercentageSettings = {
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  precision?: number
}

// Update component
function PercentageComponent() {
  const { value, settings, onUpdate, onChange } = useInputContext<PercentageProps>()

  const { min = 0, max = 1, step = 0.01, showValue = true, precision = 0 } = settings

  const displayText = `${(value * 100).toFixed(precision)}%`

  return (
    <Container>
      <Slider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onUpdate(parseFloat(e.target.value))}
        onPointerUp={() => onChange(value)}
      />
      {showValue && <Display>{displayText}</Display>}
    </Container>
  )
}

// Usage with options
const { opacity } = useControls({
  opacity: percentage({
    value: 0.8,
    step: 0.05,
    precision: 1,
    showValue: true,
  }),
})
```

## Testing

Create a test component:

```tsx
function PluginTest() {
  const values = useControls({
    basic: percentage({ value: 0.5 }),
    withRange: percentage({ value: 0.3, min: 0.1, max: 0.9 }),
    precise: percentage({ value: 0.666, precision: 2 }),
    hidden: percentage({ value: 0.8, showValue: false }),
  })

  return (
    <div>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  )
}
```

## Publishing

Create `package.json`:

```json
{
  "name": "@yourname/leva-plugin-percentage",
  "version": "1.0.0",
  "description": "Percentage input plugin for Leva",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "keywords": ["leva", "leva-plugin", "percentage", "gui"],
  "peerDependencies": {
    "leva": ">=0.9.0",
    "react": ">=16.8.0",
    "styled-components": ">=5.0.0"
  }
}
```

Build and publish:

```bash
npm run build
npm publish
```

## Best Practices

1. **Type everything**: Full TypeScript coverage
2. **Validate inputs**: Use sanitize to prevent invalid states
3. **Handle edge cases**: Test with extreme/invalid values
4. **Use onUpdate/onChange correctly**: onUpdate for drag, onChange for commit
5. **Style consistently**: Match Leva's design system
6. **Document thoroughly**: Examples and API docs
7. **Test extensively**: Edge cases, performance, accessibility

## Advanced Features

### Custom Validation

```tsx
const sanitize = (value: any, settings: PercentageSettings) => {
  const num = typeof value === 'number' ? value : parseFloat(value)
  if (isNaN(num)) throw new Error('Must be a number')

  const { min = 0, max = 1 } = settings

  // Custom validation
  if (num < min) throw new Error(`Must be at least ${min}`)
  if (num > max) throw new Error(`Must be at most ${max}`)

  return num
}
```

### Keyboard Support

```tsx
function PercentageComponent() {
  // ... previous code

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = settings.step || 0.01

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newValue = Math.min(max, value + step)
      onUpdate(newValue)
      onChange(newValue)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newValue = Math.max(min, value - step)
      onUpdate(newValue)
      onChange(newValue)
    }
  }

  return (
    <Container onKeyDown={handleKeyDown} tabIndex={0}>
      {/* ... */}
    </Container>
  )
}
```

## Next Steps

- Study [official plugins](https://github.com/pmndrs/leva/tree/main/packages) for more examples
- Learn about [Controlled Inputs](/advanced/controlled-inputs/)
- Read the [Plugin Creation Guide](/plugins/creating/)
- Join the [Discord community](https://discord.gg/poimandres)
