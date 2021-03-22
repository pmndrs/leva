import { styled } from '../../styles'

export const StyledInput = styled('input', {
  /* input reset */
  $leva__reset: '',
  padding: '0 $leva__sm',
  width: 0,
  minWidth: 0,
  flex: 1,
  height: '100%',
  variants: {
    levaType: { number: { textAlign: 'right' } },
  },
})

export const InnerLabel = styled('div', {
  $leva__draggable: '',
  height: '100%',
  $leva__flexCenter: '',
  position: 'relative',
  padding: '0 $leva__xs',
  fontSize: '0.8em',
  opacity: 0.8,
  cursor: 'default',
  [`& + ${StyledInput}`]: { paddingLeft: 0 },
})

export const InnerNumberLabel = styled(InnerLabel, {
  cursor: 'ew-resize',
  marginRight: '-$leva__xs',
  textTransform: 'uppercase',
  opacity: 0.3,
  '&:hover': { opacity: 1 },
  variants: {
    dragging: { true: { backgroundColor: '$leva__accent2', opacity: 1 } },
  },
})

export const InputContainer = styled('div', {
  $leva__flex: '',
  position: 'relative',
  borderRadius: '$leva__sm',
  overflow: 'hidden',
  color: 'inherit',
  height: '$leva__rowHeight',
  backgroundColor: '$leva__elevation3',
  $leva__inputStyle: '$leva__elevation1',
  $leva__hover: '',
  $leva__focusWithin: '',
})
