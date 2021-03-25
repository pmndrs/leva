import { createCss } from '@stitches/react'
// import prefixes from '@stitches/react/utils/prefixes'

export const getDefaultTheme = () => ({
  colors: {
    leva__elevation1: '#292d39', // bg color of the root panel (main title bar)
    leva__elevation2: '#181c20', // bg color of the rows (main panel color)
    leva__elevation3: '#373c4b', // bg color of the inputs
    leva__accent1: '#0066dc',
    leva__accent2: '#007bff',
    leva__accent3: '#3c93ff',
    leva__highlight1: '#535760',
    leva__highlight2: '#8c92a4',
    leva__highlight3: '#fefefe',
    leva__vivid1: '#ffcc00',
    leva__toolTipBackground: '$leva__highlight3',
    leva__toolTipText: '$leva__elevation2',
  },
  radii: {
    leva__xs: '2px',
    leva__sm: '3px',
    leva__lg: '10px',
  },
  space: {
    leva__xs: '3px',
    leva__sm: '6px',
    leva__md: '10px',
    leva__rowGap: '7px',
    leva__colGap: '7px',
  },
  fonts: {
    leva__mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
    leva__sans: `system-ui, sans-serif`,
  },
  fontSizes: {
    leva__root: '11px',
    leva__toolTip: '$leva__root',
  },
  sizes: {
    leva__rootWidth: '280px',
    leva__controlWidth: '160px',
    leva__numberInputMinWidth: '38px',
    leva__scrubberWidth: '8px',
    leva__scrubberHeight: '16px',
    leva__rowHeight: '24px',
    leva__folderTitleHeight: '20px',
    leva__checkboxSize: '16px',
    leva__joystickWidth: '100px',
    leva__joystickHeight: '100px',
    leva__colorPickerWidth: '$leva__controlWidth',
    leva__colorPickerHeight: '100px',
    leva__imagePreviewWidth: '$leva__controlWidth',
    leva__imagePreviewHeight: '100px',
    leva__monitorHeight: '60px',
    leva__titleBarHeight: '39px',
  },
  shadows: {
    leva__level1: '0 0 9px 0 #00000088',
    leva__level2: '0 4px 14px #00000033',
  },
  borderWidths: {
    leva__root: '0px',
    leva__input: '1px',
    leva__focus: '1px',
    leva__hover: '1px',
    leva__active: '1px',
    leva__folder: '1px',
  },
  fontWeights: {
    leva__label: 'normal',
    leva__folder: 'normal',
    leva__button: 'normal',
  },
})

export type FullTheme = ReturnType<typeof getDefaultTheme>
export type LevaCustomTheme = Partial<{ [k in keyof FullTheme]: Partial<FullTheme[k]> }>

type Options = { key: string; borderColor: string; backgroundColor?: string; inset?: boolean }

function createStateClass(value: string, options: Options) {
  const [borderColor, bgColor] = value.split(' ')
  const css: any = {}
  if (borderColor !== 'none') {
    css.boxShadow = `${options.inset ? 'inset ' : ''}0 0 0 $borderWidths${[options.key]} $colors${
      (borderColor !== 'default' && borderColor) || options.borderColor
    }`
  }

  if (bgColor) {
    css.backgroundColor = bgColor || options.backgroundColor
  }

  return css
}

const utils = {
  $leva__inputStyle: () => (value: string) =>
    createStateClass(value, { key: '$leva__input', borderColor: '$leva__highlight1', inset: true }),
  $leva__focusStyle: () => (value: string) =>
    createStateClass(value, { key: '$leva__focus', borderColor: '$leva__accent2' }),
  $leva__hoverStyle: () => (value: string) =>
    createStateClass(value, { key: '$leva__hover', borderColor: '$leva__accent1', inset: true }),
  $leva__activeStyle: () => (value: string) =>
    createStateClass(value, { key: '$leva__active', borderColor: '$leva__accent1', inset: true }),
}

export const { styled, css, theme, global: _global, keyframes } = createCss({
  insertionMethod() {
    let currentCssHead: HTMLHeadElement | null = null
    let currentCssNode: HTMLElement | null = null

    return (cssText) => {
      if (typeof document === 'object') {
        if (!currentCssHead) currentCssHead = document.head || document.documentElement
        if (!currentCssNode)
          currentCssNode =
            document.getElementById('leva__stitches') ||
            Object.assign(document.createElement('style'), { id: 'leva__stitches' })
        if (!currentCssNode.parentNode) currentCssHead.append(currentCssNode)

        currentCssNode.textContent = cssText
      }
    }
  },
  theme: getDefaultTheme(),
  utils: {
    // ...prefixes,
    ...utils,
    $leva__flex: () => () => ({
      display: 'flex',
      alignItems: 'center',
    }),
    $leva__flexCenter: () => () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    $leva__reset: () => () => ({
      outline: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      color: 'inherit',
      fontFamily: 'inherit',
      border: 'none',
      backgroundColor: 'transparent',
      appearance: 'none',
    }),
    $leva__draggable: () => () => ({
      touchAction: 'none',
      WebkitUserDrag: 'none',
      userSelect: 'none',
    }),
    $leva__focus: () => (value: string) => ({ '&:focus': utils.$leva__focusStyle()(value) }),
    $leva__focusWithin: () => (value: string) => ({ '&:focus-within': utils.$leva__focusStyle()(value) }),
    $leva__hover: () => (value: string) => ({ '&:hover': utils.$leva__hoverStyle()(value) }),
    $leva__active: () => (value: string) => ({ '&:active': utils.$leva__activeStyle()(value) }),
  },
})

const globalStyles = _global({
  '.leva__panel__dragged': {
    WebkitUserDrag: 'none',
    userSelect: 'none',
    input: { userSelect: 'none' },
    '*': { cursor: 'ew-resize !important' },
  },
})

globalStyles()
