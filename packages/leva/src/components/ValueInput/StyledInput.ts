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
    width: '14px',
    height: '100%',
    marginRight: '-$sm',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    fontSize: '0.8em',
    cursor: 'ew-resize',
    userSelect: 'none',
    opacity: '0.3',
    '&:hover': { opacity: 0.8 },
  },
})

export const InputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$sm',
  color: 'inherit',
  backgroundColor: '$elevation3',
  $inputStyle: '$elevation1',
  $hover: '',
  $focusWithin: '',
})
