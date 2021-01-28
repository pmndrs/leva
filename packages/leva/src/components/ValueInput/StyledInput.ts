import { styled } from '../../styles/stitches.config'

export const StyledInput = styled('input', {
  /* input reset */
  background: 'none',
  appearance: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: 'inherit',
  padding: '0 $input',
  width: 0,
  minWidth: 0,
  height: 'calc(var(--sizes-rowHeight) - 2 * var(--borderWidths-input))',
  flex: 1,
  /* input styling */
  border: 'none',
  outline: 'none',
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
  borderRadius: '$input',
  borderStyle: 'solid',
  borderWidth: '$input',
  borderColor: '$inputBorder',
  color: '$inputText',
  backgroundColor: '$inputBg',
  transition: 'border-color 250ms ease',
  '&:hover': {
    borderColor: '$inputHoverBorder',
  },
  '&:focus-within': {
    borderColor: '$inputFocusBorder',
  },
  '&:active': {
    backgroundColor: '$inputActiveBg',
  },
})
