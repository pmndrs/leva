import { createStyled } from '@stitches/react'

const scales = {
  colors: {
    $gray900: '#181C20',
    $gray800: '#292D39',
    $gray700: '#373C4B',
    $grey600: '#535760',
    $gray500: '#8C92A4',
    $gray50: '#FEFEFE',
    $blue500: '#007BFF',
    $blue400: '#0066DC',
    $blue100: '#3C93FF',
  },
  radii: {
    $xs: '2px',
    $sm: '3px',
    $lg: '10px',
  },
}

export const getDefaultTheme = () => ({
  colors: {
    // ...scales.colors,
    $elevation1: scales.colors.$gray800, // bg color of the root panel (main title bar)
    $elevation2: scales.colors.$gray900, // bg color of the rows (main panel color)
    $elevation3: scales.colors.$gray700, // bg color of the inputs
    // $elevation3: scales.colors.$gray900,
    $accent1: scales.colors.$blue400,
    $accent2: scales.colors.$blue500,
    $accent3: scales.colors.$blue100,
    $highlight1: scales.colors.$grey600,
    $highlight2: scales.colors.$gray500,
    $highlight3: scales.colors.$gray50,
  },
  radii: { ...scales.radii },
  space: {
    $sm: '6px',
    $md: '10px',
    $rowGap: '7px',
    $colGap: '7px',
  },
  fonts: {
    $mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
  },
  fontSizes: {
    $root: '11px',
  },
  sizes: {
    $rootWidth: '280px',
    $controlWidth: '160px',
    $scrubberWidth: '8px',
    $scrubberHeight: '16px',
    $rowHeight: '24px',
    $folderHeight: '20px',
    $checkboxSize: '16px',
    $joystickWidth: '100px',
    $joystickHeight: '100px',
    $colorPickerWidth: '160px',
    $colorPickerHeight: '100px',
    $monitorHeight: '60px',
  },
  shadows: {
    $level1: '0 0 9px 0 rgba(53,49,49,0.50)',
    $level2: '0 4px 14px #00000033',
  },
  borderWidths: {
    $root: '0px',
    $input: '1px',
    $focus: '1px',
    $hover: '1px',
    $active: '1px',
    $folder: '1px',
  },
  fontWeights: {
    $label: 'normal',
    $folder: 'normal',
    $button: 'normal',
  },
})

type FullTheme = ReturnType<typeof getDefaultTheme>
export type LevaCustomTheme = Partial<{ [k in keyof FullTheme]: Partial<FullTheme[k]> }>

type Options = { key: string; borderColor: string; backgroundColor?: string; inset?: boolean }

function createStateClass(value: string, config: any, options: Options) {
  const [borderColor, bgColor] = value.split(' ')
  const css: any = {}
  if (borderColor !== 'none') {
    css.boxShadow = `${options.inset ? 'inset ' : ''}0 0 0 ${config.tokens.borderWidths[options.key]} ${
      (borderColor !== 'default' && borderColor) || options.borderColor
    }`
  }

  if (bgColor) {
    css.backgroundColor = bgColor || options.backgroundColor
  }

  return css
}

const utils = {
  $inputStyle: (value: any, config: any) =>
    createStateClass(value, config, { key: '$input', borderColor: '$highlight1', inset: true }),
  $focusStyle: (value: any, config: any) => createStateClass(value, config, { key: '$focus', borderColor: '$accent2' }),
  $hoverStyle: (value: any, config: any) =>
    createStateClass(value, config, { key: '$hover', borderColor: '$accent1', inset: true }),
  $activeStyle: (value: any, config: any) =>
    createStateClass(value, config, { key: '$active', borderColor: '$accent1', inset: true }),
}

export const { styled, css } = createStyled({
  tokens: getDefaultTheme(),
  utils: {
    ...utils,
    $flex: () => ({
      display: 'flex',
      alignItems: 'center',
    }),
    $flexCenter: () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    $reset: () => ({
      outline: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit',
      appearance: 'none',
      fontFamily: 'inherit',
      border: 'none',
      backgroundColor: 'transparent',
    }),
    $draggable: () => ({
      touchAction: 'none',
      userSelect: 'none',
      WebKitUserDrag: 'none',
    }),
    $focus: (value, config) => ({ ':focus': utils.$focusStyle(value, config) }),
    $focusWithin: (value, config) => ({ ':focus-within': utils.$focusStyle(value, config) }),
    $hover: (value, config) => ({ ':hover': utils.$hoverStyle(value, config) }),
    $active: (value, config) => ({ ':active': utils.$activeStyle(value, config) }),
  },
})

export const globalStyles = css.global({
  '.leva__panel__dragged': {
    userSelect: 'none',
    input: { userSelect: 'none' },
    '*': { cursor: 'ew-resize !important' },
  },
  '.react-colorful': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    height: '200px',
    userSelect: 'none',
    cursor: 'default',
  },
  '.react-colorful__saturation': {
    position: 'relative',
    flex: '1',
    borderBottom: '12px solid #000',
    borderRadius: '8px 8px 0 0',
    backgroundImage:
      'linear-gradient(to top, #000, rgba(0, 0, 0, 0)),linear-gradient(to right, #fff, rgba(255, 255, 255, 0))',
  },
  '.react-colorful__pointer_fill, .react-colorful__alpha_gradient': {
    content: '""',
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    borderRadius: 'inherit',
  },
  '.react-colorful__alpha_gradient, .react-colorful__saturation': {
    boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
  },
  '.react-colorful__hue, .react-colorful__alpha': {
    position: 'relative',
    height: '24px',
  },
  '.react-colorful__hue': {
    background: `linear-gradient(
      to right,
      #f00 0%,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 67%,
      #f0f 83%,
      #f00 100%
    )`,
  },
  '.react-colorful__last-control': {
    borderRadius: '0 0 8px 8px',
  },
  '.react-colorful__interactive': {
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0',
    bottom: '0',
    borderRadius: 'inherit',
    outline: 'none',
    touchAction: 'none',
  },
  '.react-colorful__pointer': {
    position: 'absolute',
    zIndex: '1',
    boxSizing: 'border-box',
    width: '28px',
    height: '28px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: '2px solid #fff',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  '.react-colorful__interactive:focus .react-colorful__pointer': {
    transform: 'translate(-50%, -50%) scale(1.1)',
  },
  '.react-colorful__alpha, .react-colorful__alpha-pointer': {
    backgroundColor: '#fff',
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')`,
  },
  '.react-colorful__saturation_pointer': {
    zIndex: '3',
  },
  '.react-colorful__hue_pointer': {
    zIndex: '2',
  },
})
