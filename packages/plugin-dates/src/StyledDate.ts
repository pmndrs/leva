import { styled } from 'leva/plugin'

export const StyledInput = styled('input', {
  $reset: '',
  padding: '0 $sm',
  width: '100%',
  minWidth: 0,
  flex: 1,
  height: '100%',
})

export const InputContainer = styled('div', {
  $flex: '',
  position: 'relative',
  borderRadius: '$sm',
  color: 'inherit',
  height: '$rowHeight',
  backgroundColor: '$elevation3',
  $inputStyle: '$elevation1',
  $hover: '',
  $focusWithin: '',
  variants: {
    textArea: { true: { height: 'auto' } },
  },
})

export const StyledWrapper = styled('div', {
  position: 'relative',

  '& .react-datepicker__header': {
    backgroundColor: '$elevation3',
    border: 'none',
  },

  '& .react-datepicker__current-month, .react-datepicker__day, .react-datepicker__day-name': {
    color: 'inherit',
  },

  '& .react-datepicker__day': {
    transition: 'all 0.2s ease',
  },

  '& .react-datepicker__day--selected': {
    backgroundColor: '$accent1',
    color: '$highlight3',
  },

  '& .react-datepicker__day--keyboard-selected': {
    backgroundColor: 'transparent',
    color: 'inherit',
  },

  '& .react-datepicker__day--today': {
    backgroundColor: '$accent3',
    color: '$highlight3',
  },

  '& .react-datepicker__month-container': {
    backgroundColor: '$elevation2',
    borderRadius: '$lg',
  },

  '& .react-datepicker__day:hover': {
    backgroundColor: '$highlight1',
  },
})
