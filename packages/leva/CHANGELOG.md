# leva

## 0.7.1

### Patch Changes

- 98984e1: types: fix `set types in transient mode

## 0.7.0

### Minor Changes

- 0b7e968: Add the `invertY` setting for the Vector2D joystick for inverting the y coordinate.

  **BREAKING**: The default behavior has been changed. If you want the same behavior as in previous versions you will have to set the `joystick` option to `'invertY'`.

  ```tsx
  const values = useControl({
    vector2d: {
      value: [0, 0],
      joystick: 'invertY',
    },
  })
  ```

### Patch Changes

- f323cfc: Feat: `onChange` callback for transient updates

  ```js
  useControls({ color: { value: 'red', onChange: v => console.log(v) } })
  ```

## 0.6.3

### Patch Changes

- fa909f0: Allow useControls to update settings and input options when dependency array changes. (See #124)

## 0.6.2

### Patch Changes

- 72bcebe: Reject null Vectors

## 0.6.1

### Patch Changes

- 66dcb79: Add id to root div so that we're sure to always use the same root `div`. This should fix #106.
- c6a69e3: Fix scrollbars flashing when collapsing a folder. Fixes #139.
- 9e32b2c: Prevent errors in node environments by aliasing stitches global identifier to \_global as global indentifier is reserved

## 0.6.0

### Minor Changes

- ce42683: Add `hideCopyButton` property for hiding the copy to clipboard button.
