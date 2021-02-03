import { styled } from '../../styles'

export const Root = styled('div', {
  /* position */
  position: 'relative',
  fontFamily: '$mono',
  fontSize: '$root',
  backgroundColor: '$elevation1',
  boxShadow: '$root',

  variants: {
    fillParent: {
      false: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        color: '$rootText',
        width: '$rootWidth',
        borderRadius: '$lg',
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
    backgroundColor: '$accent1',
  },
})
