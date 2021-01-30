import { styled } from '../../styles'

export const StyledButton = styled('button', {
  display: 'block',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: '$textEmphasized',
  appearance: 'none',
  marginLeft: '$rowH' /* accounts for label margin */,
  height: '$rowHeight',
  borderStyle: 'none',
  borderRadius: '$sm',
  outline: 'none',
  backgroundColor: '$accent',
  transition: '$borderBg',
  cursor: 'pointer',
  '&:hover': {},
  '&:active': {},
})
