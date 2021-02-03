# Input Types

`leva` will check the input settings and provide the best possible component.

### Number

A single numerical input.

```jsx
const { myNumber } = useControls({ myNumber: 4 })
```

- Increase / decrease numbers with arrow keys, with alt (±0.1) and shift (±10) modifiers support.
- Change the value by either dragging over the input label or the inner label.
- Automatically filters the input to be a numerical value
- Automatically calculates the number input step based on the initial value magnitude and significant digits.

### Range

A Number input with an additional range slider. It will be used when you provide a `min` and `max` value.

```jsx
const { myNumber } = useControls({ myNumber: {
  value: 4,
  min: 0,
  max: 10,
  step: 1
} })
```

All rules from Number type also apply.

### Color

A color picker. Color format is inferred by the object used:

```jsx
const colors = useControls({
  myFooColor: "#fff",
  myBarColor: { r: 200, b: 125, g: 106, a: 0.4 }
})
```

In the example, `myFooColor` will create an Hexadecimal field while `myBarColor` will expose return 4 values in separate r, g, b and a numerical fields.

### Boolean

A simple toggle.

```jsx
const { toggle } = useControls({ toggle: true })
```

### Interval 

An array containing two numerical values. 
Will be used when `value` is an array of 2 numbers:

```jsx
const { myInterval } = useControls({ 
  myInterval: {
    min: 0,
    max: 10,
    value: [4,5] 
  } 
}) // initial value of 4, 5
```

All rules from Number type also apply.

### Select

@todo

### Image

@todo

### Point2d
### Point3d

@todo
