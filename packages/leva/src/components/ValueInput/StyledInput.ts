import { styled } from '../../styles'

export const StyledInput = styled('input', {
  /* input reset */
  background: 'transparent',
  appearance: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: 'inherit',
  padding: '0 $input',
  backgroundColor: 'transparent',
  width: 0,
  minWidth: 0,
  // calc accounts for the container borders
  height: 'calc(var(--sizes-rowHeight) - 2 * var(--borderWidths-input))',
  flex: 1,
  /* input styling */
  border: 'none',
  outline: 'none',

  variants: {
    isNumber: {
      true: {
        textAlign: 'right',
      },
    },
  },
})

export const InnerLabel = styled('div', {
  height: '100%',
  '& > :first-of-type': {
    width: '14px',
    height: '100%',
    marginRight: '-$input',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    opacity: '0.3',
    fontSize: '0.8em',
    cursor: 'ew-resize',
    userSelect: 'none',
    '&:hover': {
      opacity: 0.8,
    },
  },
})

export const InputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$sm',
  border: '$input solid transparent',
  color: '$highlight3',
  backgroundColor: '$elevation3',
  transition: '$borderBg',
  '&:hover': {
    borderColor: '$accent2',
  },
  '&:focus-within': {
    borderColor: '$accent1',
  },
})
