import { styled } from '../../styles'

export const ColorPreview = styled('div', {
  position: 'relative',
  boxSizing: 'border-box',
  borderRadius: '$leva__sm',
  overflow: 'hidden',
  cursor: 'pointer',
  height: '$leva__rowHeight',
  width: '$leva__rowHeight',
  backgroundColor: '#fff',
  backgroundImage: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,
  $leva__inputStyle: '',
  $leva__hover: '',
  zIndex: 1,
  variants: {
    active: { true: { $leva__inputStyle: '$leva__accent1' } },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'currentColor',
    zIndex: 1,
  },
})

export const PickerContainer = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '$sizes$leva__rowHeight auto',
  columnGap: '$leva__colGap',
  alignItems: 'center',
})

export const PickerWrapper = styled('div', {
  width: '$leva__colorPickerWidth',
  height: '$leva__colorPickerHeight',

  '.react-colorful': {
    width: '100%',
    height: '100%',
    boxShadow: '$leva__level2',
    cursor: 'crosshair',
  },

  '.react-colorful__saturation': {
    borderRadius: '$leva__sm $leva__sm 0 0',
  },

  '.react-colorful__alpha, .react-colorful__hue': {
    height: 10,
  },

  '.react-colorful__last-control': {
    borderRadius: '0 0 $leva__sm $leva__sm',
  },

  '.react-colorful__pointer': {
    height: 12,
    width: 12,
  },
})
