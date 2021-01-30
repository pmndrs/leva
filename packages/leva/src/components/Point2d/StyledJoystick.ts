import { styled } from '../../styles'

export const JoystickTrigger = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: '$elevation3',
  borderRadius: '$sm',
  cursor: 'pointer',
  height: '$rowHeight',
  width: '$rowHeight',
  touchAction: 'none',

  ':hover': {},

  ':active': {
    cursor: 'none',
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
  borderRadius: '$lg',
  boxShadow: '$overlay',
  position: 'absolute',
  zIndex: 100,
  overflow: 'hidden',
  transition: '$bg',
  backgroundColor: '$elevation3',

  variants: {
    isOutOfBounds: {
      true: {},
    },
  },

  '::after,::before': {
    content: '""',
    position: 'absolute',
    zindex: 10,
    backgroundColor: '$textDeEmphasized',
  },

  '::before': {
    width: '100%',
    height: '1px',
  },

  '::after': {
    height: '100%',
    width: '1px',
  },

  '> span': {
    position: 'relative',
    zIndex: 100,
    width: '10px',
    height: '10px',
    backgroundColor: '$accent',
    borderRadius: '50%',
  },
})
