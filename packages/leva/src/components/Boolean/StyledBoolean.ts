import { styled } from '../../styles'

export const StyledInputWrapper = styled('div', {
  position: 'relative',
  $leva__flex: '',
  height: '$leva__rowHeight',

  input: {
    $leva__reset: '',
    height: 0,
    width: 0,
    opacity: 0,
    margin: 0,
  },

  label: {
    position: 'relative',
    $leva__flexCenter: '',
    userSelect: 'none',
    cursor: 'pointer',
    height: '$leva__checkboxSize',
    width: '$leva__checkboxSize',
    backgroundColor: '$leva__elevation3',
    borderRadius: '$leva__sm',
    $leva__hover: '',
  },

  'input:focus + label': { $leva__focusStyle: '' },

  'input:focus:checked + label, input:checked + label:hover': {
    $leva__hoverStyle: '$leva__accent3',
  },

  'input + label:active': {
    backgroundColor: '$leva__accent1',
  },

  'input:checked + label:active': {
    backgroundColor: '$leva__accent1',
  },

  'label > svg': {
    display: 'none',
    width: '90%',
    height: '90%',
    stroke: '$leva__highlight3',
  },

  'input:checked + label': {
    backgroundColor: '$leva__accent2',
  },

  'input:checked + label > svg': {
    display: 'block',
  },
})
