import { styled } from '../../styles'

export const DropZone = styled('div', {
  $flexCenter: '',
  textAlign: 'center',
  overflow: 'hidden',
  minHeight: '$rowHeight',
  background: '$elevation3',
  color: 'inherit',
  borderRadius: '$sm',
  outline: 'none',
  userSelect: 'none',
  cursor: 'pointer',
  $hover: '',
  $focusWithin: '',
  $active: '$accent1 $elevation1',
  $inputStyle: '',
  variants: {
    isDragAccept: {
      true: {
        $inputStyle: '$accent1',
        backgroundColor: '$elevation1',
      },
    },
  },
})

export const Preview = styled('div', {
  position: 'relative',
  width: '100%',
  '> img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
})

export const Instructions = styled('div', {
  fontSize: '0.8em',
  height: '100%',
  padding: '$rowGap $md',
})

export const Remove = styled('div', {
  position: 'absolute',
  $flexCenter: '',
  top: '0',
  right: '0',
  margin: '$rowGap $md',
  height: 20,
  width: 20,
  borderRadius: '$sm',
  backgroundColor: '$elevation3',
  hover: 'none $accent1',

  '&::after,&::before': {
    content: '""',
    position: 'absolute',
    height: 2,
    width: 10,
    borderRadius: 1,
    backgroundColor: '$highlight3',
  },

  '&::after': { transform: 'rotate(45deg)' },
  '&::before': { transform: 'rotate(-45deg)' },
})
