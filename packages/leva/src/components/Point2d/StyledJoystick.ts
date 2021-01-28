import { styled } from '../../styles/stitches.config'

export const JoystickTrigger = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: '$inputBg',
  borderRadius: '$input',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: '$inputBorder',
  cursor: 'pointer',
  height: '$rowHeight',
  width: '$rowHeight',
  touchAction: 'none',

  ':hover': {
    borderColor: '$inputHoverBorder',
  },

  ':active': {
    borderColor: '$inputFocusBorder',
    cursor: 'crosshair',
  },

  '::after': {
    content: '""',
    backgroundColor: '$accent',
    height: '4px',
    width: '4px',
    borderRadius: '2px',
  },
})

export const JoystickPlayground = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '$joystickWidth',
  height: '$joystickHeight',
  borderRadius: '$input',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: '$inputBorder',
  boxShadow: '$overlay',
  position: 'absolute',
  zIndex: 100,
  overflow: 'hidden',
  transition: '$bg',

  variants: {
    isOutOfBounds: {
      true: {
        backgroundColor: '$inputBorder',
      },
      false: {
        backgroundColor: '$rootBg',
      },
    },
  },

  '> div': {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '$inputBorder',
    backgroundColor: '$inputBg',
    width: '80%',
    height: '80%',

    '::after,::before': {
      content: '""',
      position: 'absolute',
      zindex: 10,
      backgroundColor: '$inputBorder',
    },

    '::before': {
      width: '100%',
      height: '1px',
    },

    '::after': {
      height: '100%',
      width: '1px',
    },
  },

  '> span': {
    position: 'relative',
    zindex: 100,
    width: '10px',
    height: '10px',
    backgroundColor: '$accent',
    borderRadius: '50%',
  },
})
