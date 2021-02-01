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
    backgroundColor: '$elevation1',
  },
})

export const DragHandle = styled(StyledTitle, {
  position: 'absolute',
  width: '100%',
  opacity: 0,
  touchAction: 'none',
})

export const StyledTitleWithFilter = styled(StyledTitle, {
  display: 'flex',
  alignItems: 'center',
  height: '43px',
  padding: '0 $rowH 0 0',
  cursor: 'grab',
})

export const StyledFilterInput = styled('input', {
  height: '100%',
  flex: 1,
  padding: '0 $rowH',
  backgroundColor: 'transparent',
  transition: '$bg',
  border: 'none',
  outline: 'none',
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: '10px',
  borderRadius: '$root',
  '&:focus': {},
  '::placeholder': {
    color: 'inherit',
    opacity: 0.6,
  },
})

export const Logo = styled('div', {
  '> svg': {
    fill: '$accent',
    height: 8,
    width: 64,
  },
})
