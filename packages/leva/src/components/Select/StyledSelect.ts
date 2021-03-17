import { styled } from '../../styles'

export const SelectContainer = styled('div', {
  $leva__flexCenter: '',
  position: 'relative',
  '> svg': {
    pointerEvents: 'none',
    position: 'absolute',
    right: '$leva__md',
  },
})

export const NativeSelect = styled('select', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
})

export const PresentationalSelect = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '$leva__rowHeight',
  backgroundColor: '$leva__elevation3',
  borderRadius: '$leva__sm',
  padding: '0 $leva__sm',
  cursor: 'pointer',
  [`${NativeSelect}:focus + &`]: {
    $leva__focusStyle: '',
  },
  [`${NativeSelect}:hover + &`]: {
    $leva__hoverStyle: '',
  },
})
