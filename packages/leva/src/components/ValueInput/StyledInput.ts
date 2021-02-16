import { styled } from '../../styles'

export const StyledInput = styled('input', {
  /* input reset */
  $reset: '',
  padding: '0 $sm',
  width: 0,
  minWidth: 0,
  height: '$rowHeight',
  flex: 1,

  variants: { levaType: { number: { textAlign: 'right' }, undefined: {} } },
})

export const InnerLabel = styled('div', {
  height: '100%',
  '& > :first-of-type': {
    $flexCenter: '',
    width: 14,
    height: '100%',
    marginRight: '-$sm',
    textTransform: 'uppercase',
    fontSize: '0.8em',
    opacity: 0.3,
    '&:hover': { opacity: 0.8 },
  },
  [`& + ${StyledInput}`]: {
    paddingLeft: 0,
  },
})

export const InputContainer = styled('div', {
  $flex: '',
  borderRadius: '$sm',
  color: 'inherit',
  backgroundColor: '$elevation3',
  $inputStyle: '$elevation1',
  $hover: '',
  $focusWithin: '',
})
