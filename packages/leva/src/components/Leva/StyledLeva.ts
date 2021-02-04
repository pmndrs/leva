import { styled } from '../../styles'

export const Root = styled('div', {
  /* position */
  position: 'relative',
  fontFamily: '$mono',
  fontSize: '$root',
  color: '$rootText',

  variants: {
    fillParent: {
      false: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '$rootWidth',
        zIndex: 1000,
      },
      true: {
        position: 'relative',
        width: '100%',
      },
    },
  },

  '&,*,*:after,*:before': {
    boxSizing: 'border-box',
  },

  '*::selection': {
    backgroundColor: '$accent2',
  },
})
