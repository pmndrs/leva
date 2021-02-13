import { styled } from '../../styles'

export const SelectContainer = styled('div', {
  $flexCenter: '',
  position: 'relative',
  '> svg': {
    pointerEvents: 'none',
    position: 'absolute',
    right: '$md',
  },
})

export const StyledSelect = styled('select', {
  $reset: '',
  width: '100%',
  height: '$rowHeight',
  backgroundColor: '$elevation3',
  color: 'inherit',
  borderStyle: 'none',
  borderRadius: '$sm',
  padding: '0 $sm',
  cursor: 'pointer',
  $hover: '',
  $focus: '',
})
