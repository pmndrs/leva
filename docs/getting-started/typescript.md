---
title: Using With Typescript
description:
nav: 0
---

# Using With TypeScript

Leva has excellent TypeScript support with full type inference for your control values.

## Basic Usage

TypeScript automatically infers the return type from your schema:

```tsx
import { useControls } from 'leva'

const { count, name, enabled } = useControls({
  count: 0,
  name: 'Hello',
  enabled: true,
})

// TypeScript knows:
// count: number
// name: string
// enabled: boolean
```

## Typed Schemas

You can explicitly type your schema for better type safety:

```tsx
import { useControls, Schema } from 'leva'

type MySchema = {
  count: number
  name: string
  enabled: boolean
}

const values = useControls<MySchema>({
  count: 0,
  name: 'Hello',
  enabled: true,
})
```

## Function API Types

When using the function API, TypeScript infers the correct return type:

```tsx
const [{ count, name }, set, get] = useControls(() => ({
  count: 0,
  name: 'Hello',
}))

// set is typed as: (values: Partial<{ count: number; name: string }>) => void
// get is typed as: <T extends keyof { count: number; name: string }>(path: T) => { count: number; name: string }[T]

set({ count: 5 }) // ✅ Valid
set({ count: 'hello' }) // ❌ Type error
const value = get('count') // ✅ TypeScript knows this is a number
```

## Folder Types

Folders maintain type safety:

```tsx
import { folder, useControls } from 'leva'

const values = useControls({
  position: folder({
    x: 0,
    y: 0,
  }),
  color: folder({
    r: 255,
    g: 0,
    b: 0,
  }),
})

// values.position.x is typed as number
// values.color.r is typed as number
```

## Input Options Types

TypeScript validates input options:

```tsx
const { count } = useControls({
  count: {
    value: 0,
    min: 0,
    max: 100,
    step: 1,
  },
})

const { color } = useControls({
  color: {
    value: '#fff',
    label: 'Background Color',
    hint: 'Select a color',
  },
})
```

## Select Types

Select inputs can be typed for better autocomplete:

```tsx
type Preset = 'low' | 'medium' | 'high'

const { preset } = useControls({
  preset: {
    value: 'medium' as Preset,
    options: ['low', 'medium', 'high'] as const,
  },
})
```

## Optional and Disabled Inputs

Optional and disabled inputs return `undefined`:

```tsx
const { optionalValue, disabledValue } = useControls({
  optionalValue: {
    value: 'hello',
    optional: true,
  },
  disabledValue: {
    value: 'world',
    disabled: true,
  },
})

// optionalValue: string | undefined
// disabledValue: string | undefined
```

## Transient Inputs

Inputs with `onChange` and `transient: true` (default) are not returned:

```tsx
const values = useControls({
  color: {
    value: '#f00',
    onChange: (v) => console.log(v),
  },
})

// values.color is undefined
```

To get the value while still using `onChange`, set `transient: false`:

```tsx
const { color } = useControls({
  color: {
    value: '#f00',
    onChange: (v) => console.log(v),
    transient: false,
  },
})

// color: string
```

## Store Types

When using custom stores, types are preserved:

```tsx
import { useCreateStore, useControls } from 'leva'

const store = useCreateStore()

const values = useControls(
  {
    count: 0,
    name: 'Hello',
  },
  { store }
)
```

## Plugin Types

When creating plugins, use the `Plugin` interface:

```tsx
import { Plugin, LevaInputProps } from 'leva'

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
    value: input.value,
    settings: { multiplier: input.multiplier ?? 1 },
  }),
  sanitize: (value) => Number(value),
}
```

## useInputContext Types

Type your `useInputContext` hook for plugin development:

```tsx
import { useInputContext, LevaInputProps } from 'leva'

function MyPlugin() {
  const { value, displayValue, settings, setSettings } =
    useInputContext<LevaInputProps<number, { multiplier: number }>>()

  // value and settings are properly typed
}
```

## Common Type Patterns

### Typed Vector Values

```tsx
type Vector2 = { x: number; y: number }

const { position } = useControls({
  position: { x: 0, y: 0 } as Vector2,
})
```

### Typed Color Values

```tsx
type RGB = { r: number; g: number; b: number }

const { color } = useControls({
  color: { r: 255, g: 0, b: 0 } as RGB,
})
```

### Typed Schema with Render Functions

```tsx
const values = useControls({
  showAdvanced: false,
  advancedValue: {
    value: 0,
    render: (get) => get('showAdvanced') as boolean,
  },
})
```

## Type Exports

Leva exports useful types:

```tsx
import type { Schema, SchemaToValues, FolderSettings, InputOptions, Plugin, LevaInputProps } from 'leva'
```
