---
title: TypeScript
description: Using Leva with TypeScript
---

Leva has first-class TypeScript support with full type inference for controls and values.

## Basic Type Inference

TypeScript automatically infers types from your control definitions:

```tsx
import { useControls } from 'leva'

function App() {
  const values = useControls({
    name: 'World', // string
    count: 0, // number
    enabled: true, // boolean
    color: '#ff0000', // string
  })

  // values is typed as:
  // {
  //   name: string
  //   count: number
  //   enabled: boolean
  //   color: string
  // }
}
```

## Explicit Types

Define explicit types for more control:

```tsx
import { useControls } from 'leva'

type Settings = {
  quality: 'low' | 'medium' | 'high'
  resolution: [number, number]
  enabled: boolean
}

function App() {
  const settings = useControls<Settings>({
    quality: {
      options: ['low', 'medium', 'high'] as const,
      value: 'medium',
    },
    resolution: [1920, 1080],
    enabled: true,
  })

  // settings is fully typed as Settings
}
```

## Schema Types

Define reusable schemas with types:

```tsx
import { useControls, Schema } from 'leva'

const lightingSchema: Schema = {
  intensity: { value: 1, min: 0, max: 5, step: 0.1 },
  color: '#ffffff',
  castShadow: true,
}

function Light() {
  const config = useControls('Lighting', lightingSchema)
  // config is typed automatically
}
```

## Folder Types

Type-safe nested folders:

```tsx
import { folder, useControls } from 'leva'

function App() {
  const config = useControls({
    graphics: folder({
      quality: { options: ['low', 'high'] },
      antialiasing: true,
    }),
    audio: folder({
      volume: { value: 0.8, min: 0, max: 1 },
      muted: false,
    }),
  })

  // config.graphics.quality is typed as 'low' | 'high'
  // config.audio.volume is typed as number
}
```

## Vector Types

Vectors are typed based on their structure:

```tsx
const values = useControls({
  position2D: { x: 0, y: 0 }, // { x: number, y: number }
  position3D: { x: 0, y: 0, z: 0 }, // { x: number, y: number, z: number }
  array2D: [0, 0], // [number, number]
  array3D: [0, 0, 0], // [number, number, number]
})
```

## Color Types

Colors can have different type representations:

```tsx
const colors = useControls({
  hex: '#ffffff', // string
  rgb: { r: 255, g: 255, b: 255 }, // { r: number, g: number, b: number }
  rgba: {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  }, // { r: number, g: number, b: number, a: number }
})
```

## Select Types

Constrain select values with literal types:

```tsx
const { preset } = useControls({
  preset: {
    options: ['fast', 'balanced', 'quality'] as const,
    value: 'balanced',
  },
})

// preset is typed as 'fast' | 'balanced' | 'quality'
```

Or use an enum:

```tsx
enum Quality {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

const { quality } = useControls({
  quality: {
    options: Object.values(Quality),
    value: Quality.Medium,
  },
})

// quality is typed as Quality
```

## Controlled Inputs

Type the set function:

```tsx
type Controls = {
  position: { x: number; y: number }
  rotation: number
}

function App() {
  const [values, set] = useControls<Controls>(() => ({
    position: { x: 0, y: 0 },
    rotation: 0,
  }))

  // set is typed as (values: Partial<Controls>) => void

  const reset = () => {
    set({
      position: { x: 0, y: 0 },
      rotation: 0,
    })
  }
}
```

## onChange Types

Callbacks are fully typed:

```tsx
useControls({
  color: {
    value: '#ffffff',
    onChange: (value, path, context) => {
      // value is typed as string
      // path is typed as string[]
      // context is typed as Context
    },
  },
})
```

## Plugin Types

Create type-safe plugins:

```tsx
import { createPlugin, LevaInputProps, useInputContext } from 'leva/plugin'

type MyValue = { x: number; y: number }
type MySettings = { min?: number; max?: number }
type MyInput = MyValue & MySettings

type MyProps = LevaInputProps<MyValue, MySettings, string>

function MyComponent() {
  const props = useInputContext<MyProps>()

  // props is fully typed:
  // - props.value: MyValue
  // - props.settings: MySettings
  // - props.displayValue: string
  // - etc.

  return <div>{/* ... */}</div>
}

const myPlugin = createPlugin<MyInput, MyValue, MySettings>({
  component: MyComponent,
  normalize: (input) => {
    return {
      value: { x: input.x, y: input.y },
      settings: { min: input.min, max: input.max },
    }
  },
  // ... other functions
})
```

## Store Types

Type custom stores:

```tsx
import { useCreateStore, StoreType } from 'leva'

function App() {
  const store: StoreType = useCreateStore()

  useControls({ value: 0 }, { store })
}
```

## Common Type Patterns

### Conditional Types

```tsx
type Config = {
  useAdvanced: boolean
  advanced?: {
    detail: number
    quality: string
  }
}

function App() {
  const config = useControls<Config>({
    useAdvanced: false,
    advanced: folder(
      {
        detail: 5,
        quality: 'high',
      },
      {
        render: (get) => get('useAdvanced'),
      }
    ),
  })

  if (config.useAdvanced && config.advanced) {
    // TypeScript knows advanced exists here
  }
}
```

### Union Types

```tsx
type Theme = 'light' | 'dark'
type Size = 'small' | 'medium' | 'large'

type Config = {
  theme: Theme
  size: Size
}

const config = useControls<Config>({
  theme: { options: ['light', 'dark'], value: 'light' },
  size: { options: ['small', 'medium', 'large'], value: 'medium' },
})
```

### Complex Objects

```tsx
type Material = {
  color: string
  metalness: number
  roughness: number
}

type SceneConfig = {
  background: string
  material: Material
  lighting: {
    intensity: number
    color: string
  }
}

const config = useControls<SceneConfig>({
  background: '#000000',
  material: folder({
    color: '#ffffff',
    metalness: { value: 0.5, min: 0, max: 1 },
    roughness: { value: 0.5, min: 0, max: 1 },
  }),
  lighting: folder({
    intensity: { value: 1, min: 0, max: 5 },
    color: '#ffffff',
  }),
})
```

## Type Utilities

Leva exports useful type utilities:

```tsx
import type { Schema, SchemaToValues, LevaInputProps, InputContext, StoreType } from 'leva'

// Extract value types from schema
type MySchema = {
  name: string
  count: number
}

type Values = SchemaToValues<MySchema>
// Values = { name: string, count: number }
```

## Troubleshooting

### Type Narrowing with Select

If select types aren't narrowing, use `as const`:

```tsx
// ❌ Won't narrow
const { value } = useControls({
  value: { options: ['a', 'b', 'c'] },
})
// value is string

// ✅ Narrows correctly
const { value } = useControls({
  value: { options: ['a', 'b', 'c'] as const },
})
// value is 'a' | 'b' | 'c'
```

### Optional Values

For optional controls, TypeScript may not infer correctly. Use explicit types:

```tsx
type Config = {
  optional?: number
}

const config = useControls<Config>({
  optional: { value: 10, optional: true },
})

// config.optional might be undefined
```

### Strict Mode

Enable strict TypeScript checks in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true
  }
}
```

## Best Practices

1. **Use `as const` for literal arrays**: Enables proper type narrowing
2. **Define explicit types for complex configs**: Improves readability and safety
3. **Type plugin inputs and outputs**: Ensures type safety across the API
4. **Use enums for select options**: Better type safety than strings
5. **Enable strict mode**: Catches more potential issues

## Next Steps

- Learn about [Controlled Inputs](/advanced/controlled-inputs/)
- Create a [Custom Plugin](/advanced/custom-plugin/)
- See [Plugin Development](/plugins/creating/)
