import { styled } from '../../styles'

export const JoystickTrigger = styled('div', {
  $leva__flexCenter: '',
  position: 'relative',
  backgroundColor: '$leva__elevation3',
  borderRadius: '$leva__sm',
  cursor: 'pointer',
  height: '$leva__rowHeight',
  width: '$leva__rowHeight',
  $leva__draggable: '',
  $leva__hover: '',

  '&:active': { cursor: 'none' },

  '&::after': {
    content: '""',
    backgroundColor: '$leva__accent2',
    height: 4,
    width: 4,
    borderRadius: 2,
  },
})

export const JoystickPlayground = styled('div', {
  $leva__flexCenter: '',
  width: '$leva__joystickWidth',
  height: '$leva__joystickHeight',
  borderRadius: '$leva__sm',
  boxShadow: '$leva__level2',
  position: 'fixed',
  zIndex: 10000,
  overflow: 'hidden',
  $leva__draggable: '',
  transform: 'translate(-50%, -50%)',

  variants: {
    isOutOfBounds: {
      true: { backgroundColor: '$leva__elevation1' },
      false: { backgroundColor: '$leva__elevation3' },
    },
  },
  '> div': {
    position: 'absolute',
    $leva__flexCenter: '',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '$leva__highlight1',
    backgroundColor: '$leva__elevation3',
    width: '80%',
    height: '80%',

    '&::after,&::before': {
      content: '""',
      position: 'absolute',
      zindex: 10,
      backgroundColor: '$leva__highlight1',
    },

    '&::before': {
      width: '100%',
      height: 1,
    },

    '&::after': {
      height: '100%',
      width: 1,
    },
  },

  '> span': {
    position: 'relative',
    zindex: 100,
    width: 10,
    height: 10,
    backgroundColor: '$leva__accent2',
    borderRadius: '50%',
  },
})
