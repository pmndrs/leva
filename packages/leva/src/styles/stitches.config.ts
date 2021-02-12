import createStyled from '@stitches/react'

export const getDefaultTheme = () => ({
  colors: {
    elevation1: '#292D39', // bg color of the root panel (main title bar)
    elevation2: '#181C20', // bg color of the rows (main panel color)
    elevation3: '#373C4B', // bg color of the inputs
    accent1: '#0066DC',
    accent2: '#007BFF',
    accent3: '#3C93FF',
    highlight1: '#535760',
    highlight2: '#8C92A4',
    highlight3: '#FEFEFE',
  },
  radii: { xs: '2px', sm: '3px', lg: '10px' },
  space: {
    sm: '6px',
    md: '10px',
    rowGap: '7px',
    colGap: '7px',
  },
  fonts: {
    mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
  },
  fontSizes: {
    root: '11px',
  },
  sizes: {
    rootWidth: '280px',
    controlWidth: '160px',
    scrubberWidth: '8px',
    scrubberHeight: '16px',
    rowHeight: '24px',
    folderHeight: '20px',
    checkboxSize: '16px',
    joystickWidth: '100px',
    joystickHeight: '100px',
    colorPickerWidth: '160px',
    colorPickerHeight: '100px',
    monitorHeight: '60px',
  },
  shadows: {
    level1: '0 0 9px 0 rgba(53,49,49,0.50)',
    level2: '0 4px 14px #00000033',
  },
  borderWidths: {
    root: '0px',
    input: '1px',
    focus: '1px',
    hover: '1px',
    active: '1px',
    folder: '1px',
  },
  fontWeights: {
    label: 'normal',
    folder: 'normal',
    button: 'normal',
  },
})

export type FullTheme = ReturnType<typeof getDefaultTheme>
export type LevaCustomTheme = Partial<{ [k in keyof FullTheme]: Partial<FullTheme[k]> }>

type Options = { key: string; borderColor: string; backgroundColor?: string; inset?: boolean }

function createStateClass(value: string, config: any, options: Options) {
  const [borderColor, bgColor] = value.split(' ')
  const css: any = {}
  if (borderColor !== 'none') {
    css.boxShadow = `${options.inset ? 'inset ' : ''}0 0 0 ${config.theme.borderWidths[options.key]} ${
      (borderColor !== 'default' && borderColor) || options.borderColor
    }`
  }

  if (bgColor) {
    css.backgroundColor = bgColor || options.backgroundColor
  }

  return css
}

const utils = {
  $inputStyle: (config: any) => (value: any) =>
    createStateClass(value, config, { key: '$input', borderColor: '$highlight1', inset: true }),
  $focusStyle: (config: any) => (value: any) =>
    createStateClass(value, config, { key: '$focus', borderColor: '$accent2' }),
  $hoverStyle: (config: any) => (value: any) =>
    createStateClass(value, config, { key: '$hover', borderColor: '$accent1', inset: true }),
  $activeStyle: (config: any) => (value: any) =>
    createStateClass(value, config, { key: '$active', borderColor: '$accent1', inset: true }),
}

export const { styled, css, theme, global } = createStyled({
  theme: getDefaultTheme(),
  utils: {
    ...utils,
    $flex: () => () => ({
      display: 'flex',
      alignItems: 'center',
    }),
    $flexCenter: () => () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    $reset: () => () => ({
      outline: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit',
      appearance: 'none',
      fontFamily: 'inherit',
      border: 'none',
      backgroundColor: 'transparent',
    }),
    $draggable: () => () => ({
      touchAction: 'none',
      userSelect: 'none',
      WebKitUserDrag: 'none',
    }),
    $focus: (config) => (value) => ({ '&:focus': utils.$focusStyle(config)(value) }),
    $focusWithin: (config) => (value) => ({ '&:focus-within': utils.$focusStyle(config)(value) }),
    $hover: (config) => (value) => ({ '&:hover': utils.$hoverStyle(config)(value) }),
    $active: (config) => (value) => ({ '&:active': utils.$activeStyle(config)(value) }),
  },
})

const globalStyles = global({
  '.leva__panel__dragged': {
    userSelect: 'none',
    input: { userSelect: 'none' },
    '*': { cursor: 'ew-resize !important' },
  },
})

globalStyles()
