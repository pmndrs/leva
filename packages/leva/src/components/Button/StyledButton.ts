import { styled } from '../../styles'

export const StyledButton = styled('button', {
  display: 'block',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: '$highlight3',
  appearance: 'none',
  height: '$rowHeight',
  borderStyle: 'none',
  borderRadius: '$sm',
  outline: 'none',
  backgroundColor: '$accent2',
  transition: '$borderBg',
  cursor: 'pointer',
  hover: '$accent3',
  active: '$accent3 $accent1',
  focus: '',
})
