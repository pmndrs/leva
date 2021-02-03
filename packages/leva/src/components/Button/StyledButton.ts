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
  backgroundColor: '$accent1',
  transition: '$borderBg',
  cursor: 'pointer',
  '&:hover': {
    border: '$input solid $accent3',
  },
  '&:active': {
    border: '$input solid $accent3',
    backgroundColor: '$accent2',
  },
})
