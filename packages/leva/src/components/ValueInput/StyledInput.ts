import { styled } from '../../styles'

export const StyledInput = styled('input', {
  /* input reset */
  $reset: '',
  padding: '0 $sm',
  width: 0,
  minWidth: 0,
  height: '$rowHeight',
  flex: 1,

  variants: { isNumber: { true: { textAlign: 'right' } } },
})

export const InnerLabel = styled('div', {
  height: '100%',
  '& > :first-of-type': {
    $flexCenter: '',
    width: '14px',
    height: '100%',
    marginRight: '-$sm',
    textTransform: 'uppercase',
    fontSize: '0.8em',
    cursor: 'ew-resize',
    userSelect: 'none',
    opacity: '0.3',
    '&:hover': { opacity: 0.8 },
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
