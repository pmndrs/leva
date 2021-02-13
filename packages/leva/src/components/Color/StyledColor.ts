import { styled } from '../../styles'

export const ColorPreview = styled('div', {
  boxSizing: 'border-box',
  borderRadius: '$sm',
  cursor: 'pointer',
  height: '$rowHeight',
  width: '$rowHeight',
  $inputStyle: '',
  $hover: '',
  variants: {
    active: { true: { $inputStyle: '$accent1' }, false: {} },
  },
})

export const PickerContainer = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '$sizes$rowHeight auto',
  gridColumnGap: '$colGap',
  alignItems: 'center',
  '& > span': {
    fontSize: '0.95em',
    opacity: 0.8,
    padding: '0 $md',
  },
})

export const PickerWrapper = styled('div', {
  position: 'fixed',
  left: 0,
  zIndex: 10000,
  width: '$colorPickerWidth',
  height: '$colorPickerHeight',

  '.react-colorful': {
    width: '100%',
    height: '100%',
    boxShadow: '$level2',
    cursor: 'crosshair',
  },

  '.react-colorful__saturation': {
    borderRadius: '$sm $sm 0 0',
  },

  '.react-colorful__alpha, .react-colorful__hue': {
    height: 10,
  },

  '.react-colorful__last-control': {
    borderRadius: '0 0 $sm $sm',
  },

  '.react-colorful__pointer': {
    height: 12,
    width: 12,
  },
})
