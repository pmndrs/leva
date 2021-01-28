import { createStyled } from '@stitches/react'

export const { styled, css } = createStyled({
  tokens: {
    colors: {
      $primary: '#ccc',
      $accent: '#333',
      $labelText: '#333',
      $rootBg: '#f2f2f2',
      $rootText: '#333',
      $rootBorder: '#ccc',
      $folderText: '#f9f6ff',
      $folderBorder: '#333',
      $folderTitleBg: '#333',
      $inputBg: '#fff',
      $inputText: '#333',
      $inputBorder: '#e5e5e5',
      $inputHoverBorder: '#ccc',
      $inputFocusBorder: '#666',
      $inputActiveBg: '#f2f2f2',
      $buttonText: '#333',
      $buttonBg: '#fff',
      $selectBg: '#fff',
      $selection: '#ccc',
    },
    radii: {
      $input: '2px',
      $root: '2px',
    },
    space: {
      $input: '6px',
      $folderH: '6px',
      $folderV: '3px',
      $rowH: '3px',
      $rowV: '3px',
      $colGap: '3px',
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
      $scrubberWidth: '6px',
      $scrubberHeight: '14px',
      $rowHeight: '25px',
      $joystickWidth: '100px',
      $joystickHeight: '100px',
    },
    shadows: {
      $root: '0 0 40px #00000033',
      $overlay: '0 4px 14px #00000033',
    },
    borderWidths: {
      $input: '1px',
      $root: '0px',
      $folder: '4px',
    },
    fontWeights: {
      $folder: '600',
      $label: '600',
    },
    transitions: {
      $border: 'border-color 250ms ease',
      $bg: 'background-color 250ms ease',
      $borderBg: 'border-color, background-color 250ms ease',
    },
  },
})
