import { styled } from '../../styles'
import { StyledTitle } from '../Folder/StyledFolder'

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
        position: 'absolute',
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

  // '*::selection': {
  //   backgroundColor: '$elevation1',
  // },
})

export const DragHandle = styled(StyledTitle, {
  position: 'absolute',
  width: '100%',
  cursor: 'grab',
  opacity: 0,
  touchAction: 'none',
})

export const StyledFilter = styled(StyledTitle, {
  position: 'absolute',
  right: 0,
  left: '60px',
  zIndex: 10,
  padding: 0,
  '> input': {
    height: '43px',
    width: '100%',
    padding: '0 $rowH',
    backgroundColor: 'transparent',
    transition: '$bg',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: '10px',
    textAlign: 'right',
    borderRadius: '$root',
    '&:focus': {},
    '::placeholder': {
      color: 'inherit',
      opacity: 0.6,
    },
  },
})
