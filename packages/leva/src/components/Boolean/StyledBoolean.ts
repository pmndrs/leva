import { styled } from '../../styles/stitches.config'

export const StyledInputWrapper = styled('div', {
  position: 'relative',
  height: '100%',
  display: 'flex',
  padding: 'input',

  input: {
    height: 0,
    width: 0,
    visibility: 'hidden',
    margin: 0,
  },

  label: {
    position: 'relative',
    display: 'block',
    cursor: 'pointer',
    height: '12px',
    width: '30px',
    backgroundColor: '$primary',
    borderRadius: '20px',

  'label::after': {
    content: '""',
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '8px',
    height: '8px',
    backgroundColor: '$rootBg',
    borderRadius: '4px',
    transition: '0.3s',
  },

  'input:checked + label': {
    backgroundColor: '$accent',
  },

  'input:checked + label::after': {
    left: 'calc(100% - 2px)',
    transform: 'translateX(-100%)',
  },

  'label:active::after': {
    width: '12px',
  },
})
