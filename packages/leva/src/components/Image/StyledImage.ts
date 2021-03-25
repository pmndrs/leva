import { styled } from '../../styles'

export const ImageContainer = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '$sizes$leva__rowHeight auto 20px',
  columnGap: '$leva__colGap',
  alignItems: 'center',
})

export const DropZone = styled('div', {
  $leva__flexCenter: '',
  overflow: 'hidden',
  height: '$leva__rowHeight',
  background: '$leva__elevation3',
  textAlign: 'center',
  color: 'inherit',
  borderRadius: '$leva__sm',
  outline: 'none',
  userSelect: 'none',
  cursor: 'pointer',
  $leva__inputStyle: '',
  $leva__hover: '',
  $leva__focusWithin: '',
  $leva__active: '$leva__accent1 $leva__elevation1',
  variants: {
    isDragAccept: {
      true: {
        $leva__inputStyle: '$leva__accent1',
        backgroundColor: '$leva__elevation1',
      },
    },
  },
})

export const ImagePreview = styled('div', {
  boxSizing: 'border-box',
  borderRadius: '$leva__sm',
  height: '$leva__rowHeight',
  width: '$leva__rowHeight',
  $leva__inputStyle: '',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  variants: {
    hasImage: {
      true: { cursor: 'pointer', $leva__hover: '', $leva__active: '' },
    },
  },
})

export const ImageLargePreview = styled('div', {
  $leva__flexCenter: '',
  width: '$leva__imagePreviewWidth',
  height: '$leva__imagePreviewHeight',
  borderRadius: '$leva__sm',
  boxShadow: '$leva__level2',
  pointerEvents: 'none',
  $leva__inputStyle: '',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

export const Instructions = styled('div', {
  fontSize: '0.8em',
  height: '100%',
  padding: '$leva__rowGap $leva__md',
})

export const Remove = styled('div', {
  $leva__flexCenter: '',
  top: '0',
  right: '0',
  marginRight: '$leva__sm',
  height: '100%',
  cursor: 'pointer',

  variants: {
    disabled: {
      true: { color: '$leva__elevation3', cursor: 'default' },
    },
  },

  '&::after,&::before': {
    content: '""',
    position: 'absolute',
    height: 2,
    width: 10,
    borderRadius: 1,
    backgroundColor: 'currentColor',
  },

  '&::after': { transform: 'rotate(45deg)' },
  '&::before': { transform: 'rotate(-45deg)' },
})
