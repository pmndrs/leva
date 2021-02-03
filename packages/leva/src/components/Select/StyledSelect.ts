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
  width: '100%',
  $reset: '',
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
