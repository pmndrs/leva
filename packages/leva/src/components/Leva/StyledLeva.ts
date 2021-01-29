import { styled } from '../../styles'
import { StyledTitle } from '../Folder/StyledFolder'

export const Root = styled('div', {
  /* position */
  fontFamily: '$mono',
  fontSize: '$root',
  backgroundColor: '$rootBg',
  boxShadow: '$root',

  variants: {
    fillParent: {
      false: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: '$rootText',
        width: '$rootWidth',
        borderRadius: '$root',
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
    backgroundColor: '$selection',
  },
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
  zIndex: 10,
  padding: 0,
  '> input': {
    height: '19px',
    padding: '0 $rowH',
    backgroundColor: '$accent',
    transition: '$bg',
    border: 'none',
    outline: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: '10px',
    textAlign: 'right',
    borderRadius: '$root',
    '&:focus': {
      backgroundColor: '$accent',
    },
    '&[value=""]': {
      backgroundColor: 'transparent',
    },
    '::placeholder': {
      color: 'inherit',
      opacity: 0.6,
    },
  },
})
