import { styled } from '../../styles'

export const StyledButton = styled('button', {
  display: 'block',
  $reset: '',
  fontWeight: '$button',
  height: '$rowHeight',
  borderStyle: 'none',
  borderRadius: '$sm',
  backgroundColor: '$elevation1',
  color: '$highlight1',
  '&:not(:disabled)': {
    color: '$highlight3',
    backgroundColor: '$accent2',
    cursor: 'pointer',
    $hover: '$accent3',
    $active: '$accent3 $accent1',
    $focus: '',
  },
})
