import { styled } from '../../styles'
import { StyledInputRow } from '../UI/StyledUI'

export const StyledRoot = styled('div', {
  /* position */
  position: 'relative',
  fontFamily: '$mono',
  fontSize: '$root',
  color: '$rootText',
  backgroundColor: '$elevation1',

  variants: {
    detached: {
      true: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '$rootWidth',
        borderRadius: '$lg',
        boxShadow: '$level1',
        zIndex: 1000,
      },
      false: {
        position: 'relative',
        width: '100%',
      },
    },
    oneLineLabels: {
      true: {
        [`${StyledInputRow}`]: {
          gridTemplateColumns: 'auto',
          gridAutoColumns: 'minmax(max-content, 1fr)',
          gridAutoRows: 'minmax($sizes$rowHeight), auto)',
          rowGap: 0,
          columnGap: 0,
          marginTop: '$rowGap',
        },
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
