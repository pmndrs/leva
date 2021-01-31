import { createStyled } from '@stitches/react'
import { ITokensDefinition } from '@stitches/core'

const scales = {
  colors: {
    $gray900: '#181C20',
    $gray800: '#292D39',
    $gray700: '#383C4A',
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

export const getDefaultTheme = (): NonNullable<ITokensDefinition> => ({
  colors: {
    ...scales.colors,
    $elevation1: scales.colors.$gray800,
    $elevation2: scales.colors.$gray900,
    $elevation3: scales.colors.$gray700,
    $accent: scales.colors.$blue500,
    $accent2: scales.colors.$blue400,
    $accent3: scales.colors.$blue100,
    $text: scales.colors.$gray500,
    $textEmphasized: scales.colors.$gray50,
    $textDeEmphasized: scales.colors.$grey600,
  },
  radii: {
    ...scales.radii,
  },
  space: {
    $input: '8px',
    $folderH: '12px',
    $folderV: '8px',
    $rowH: '10px',
    $rowV: '4px',
    $colGap: '4px',
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
    $scrubberWidth: '16px',
    $scrubberHeight: '16px',
    $rowHeight: '24px',
    $joystickWidth: '100px',
    $joystickHeight: '100px',
  },
  shadows: {
    $root: '0 0 9px 0 rgba(53,49,49,0.50);',
    $overlay: '0 4px 14px #00000033',
  },
  borderWidths: {
    $input: '1px',
    $root: '0px',
    $folder: '4px',
  },
  fontWeights: {
    $text: '600',
  },
  transitions: {
    $border: 'border-color 250ms ease',
    $bg: 'background-color 250ms ease',
    $borderBg: 'border-color, background-color 250ms ease',
  },
})

export const { styled, css } = createStyled({
  tokens: getDefaultTheme(),
})

export const globalStyles = css.global({
  '.leva__body__dragged': {
    userSelect: 'none',
    input: {
      userSelect: 'none',
    },
    '*': {
      cursor: 'ew-resize !important',
    },
  },
})
