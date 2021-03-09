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

export const StyledSelect = styled('select', {
  $leva__reset: '',
  width: '100%',
  height: '$leva__rowHeight',
  backgroundColor: '$leva__elevation3',
  color: 'inherit',
  borderStyle: 'none',
  borderRadius: '$leva__sm',
  padding: '0 $leva__sm',
  cursor: 'pointer',
  $leva__hover: '',
  $leva__focus: '',
})
