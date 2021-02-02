import { styled } from '../../styles'

export const StyledInputWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '$rowHeight',

  input: {
    height: 0,
    width: 0,
    opactiy: 0,
    margin: 0,
  },

  label: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    height: 'calc(var(--sizes-rowHeight) - 8px)',
    width: 'calc(var(--sizes-rowHeight) - 8px)',
    backgroundColor: '$elevation3',
    borderRadius: '$sm',
  },

  'input:focus + label': {
    border: '$input solid $accent',
  },

  'label:active': {
    backgroundColor: '$accent2',
  },

  'label > svg': {
    display: 'none',
    width: '90%',
    height: '90%',
    stroke: '$textEmphasized',
  },

  'input:checked + label': {
    backgroundColor: '$accent',
  },

  'input:checked + label > svg': {
    display: 'block',
  },
})
