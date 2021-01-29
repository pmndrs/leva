import { styled } from '../../styles'

export const StyledButton = styled('button', {
  display: 'block',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: '$buttonText',
  fontWeight: 'bold',
  appearance: 'none',
  marginLeft: '$rowH' /* accounts for label margin */,
  height: '100%',
  borderStyle: 'solid',
  borderRadius: '$input',
  borderWidth: '1px',
  borderColor: '$inputHoverBorder',
  outline: 'none',
  backgroundColor: '$buttonBg',
  transition: '$borderBg',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '$inputFocusBorder',
  },
  '&:active': {
    backgroundColor: '$inputActiveBg',
    borderColor: '$inputFocusColor',
  },
})
