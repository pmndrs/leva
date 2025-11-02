import { styled } from '../../styles'
import { JoystickGrid } from './StyledJoystick'

export const JoystickButtons = styled('div', {
  display: 'grid',
  columnGap: '$colGap',
  gridAutoFlow: 'column dense',
  alignItems: 'center',
  padding: '0 $colGap',
  position: 'absolute',
  bottom: 'calc(-1 * $sizes$rowHeight - 2 * $space$rowGap + $radii$sm)',
  backgroundColor: '$elevation2',
  borderRadius: '$sm',
  width: '$joystickWidth',
  height: 'calc(2 * $space$rowGap + $sizes$rowHeight)',
  fontFamily: '$mono',
  fontSize: '$root',
})

export const KeyLabel = styled('span', {
  position: 'absolute',
  top: '0',
  right: '2px',
  fontSize: '0.8em',
  fontStyle: 'italic',
})

export const StyledJoyCubeFace = styled(JoystickGrid, {
  width: '80px',
  height: '80px',
  backfaceVisibility: 'hidden',
})

export const StyledJoyCube = styled('div', {
  '--joycube-size': '80px',
  '--joycube-half-size': 'calc(var(--joycube-size) / 2)',
  '--joycube-half-size-negative': 'calc(var(--joycube-size) / -2)',
  '--joycube-opacity-mid': '0.5',
  '--joycube-opacity-rear': '0.3',
  position: 'absolute',
  width: 'var(--joycube-size)',
  height: 'var(--joycube-size)',
  transformOrigin: 'var(--joycube-half-size) var(--joycube-half-size) var(--joycube-half-size-negative)',
  transformStyle: 'preserve-3d',
  transform: 'rotateY( 0deg) translateZ(var(--joycube-half-size-negative))',
  variants: {
    top: {
      true: { transform: 'rotateX(-90deg) translateZ(var(--joycube-half-size-negative))' },
    },
    right: {
      true: { transform: 'rotateY(-90deg) translateZ(var(--joycube-half-size-negative))' },
    },
  },
  transition: 'transform 0.5s',

  '> .joycube-face--front': {
    transform: 'rotateY(  0deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--front-mid': {
    transform: 'rotateY(  0deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--front-rear': {
    transform: 'rotateY(  0deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--right': {
    transform: 'rotateY( 90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--right-mid': {
    transform: 'rotateY( 90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--right-rear': {
    transform: 'rotateY( 90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--back': {
    transform: 'rotateY(180deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--back-mid': {
    transform: 'rotateY(180deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--back-rear': {
    transform: 'rotateY(180deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--left': {
    transform: 'rotateY(-90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--left-mid': {
    transform: 'rotateY(-90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--left-rear': {
    transform: 'rotateY(-90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--top': {
    transform: 'rotateX( 90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--top-mid': {
    transform: 'rotateX( 90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--top-rear': {
    transform: 'rotateX( 90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },

  '> .joycube-face--bottom': {
    transform: 'rotateX(-90deg) translateZ(var(--joycube-half-size))',
  },

  '> .joycube-face--bottom-mid': {
    transform: 'rotateX(-90deg) translateZ(0px)',
    opacity: 'var(--joycube-opacity-mid)',
  },

  '> .joycube-face--bottom-rear': {
    transform: 'rotateX(-90deg) translateZ(var(--joycube-half-size-negative))',
    opacity: 'var(--joycube-opacity-rear)',
  },
})
