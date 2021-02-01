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
    backgroundColor: '$accent',
  },
})

export const DragHandle = styled(StyledTitle, {
  position: 'absolute',
  width: '100%',
  opacity: 0,
  touchAction: 'none',
})

export const StyledTitleWithFilter = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '43px',
  cursor: 'grab',
})

export const FilterWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  transition: 'height 250ms ease',
  variants: {
    toggled: { true: { height: 30 }, false: { height: 0 } },
  },
})

export const StyledFilterInput = styled('input', {
  height: 30,
  width: '100%',
  padding: '0 $rowH',
  backgroundColor: 'transparent',
  transition: '$bg',
  border: 'none',
  outline: 'none',
  color: '$textEmphasized',
  fontFamily: 'inherit',
  fontSize: '10px',
  borderRadius: '$root',
  '&:focus': {},
  '::placeholder': {
    color: 'inherit',
    opacity: 0.6,
  },
})

export const Icon = styled('i', {
  width: 40,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '> svg': {
    fill: '$textDeEmphasized',
    transition: 'transform 350ms ease, fill 250ms ease',
    cursor: 'pointer',
  },
  ':hover > svg': {
    fill: '$textEmphasized',
  },
})

export const Drag = styled('div', {
  '> svg': {
    fill: '$textDeEmphasized',
    height: 8,
    width: 64,
    transition: 'fill 250ms ease',
  },
  [`${StyledTitleWithFilter}:hover & > svg`]: {
    fill: '$accent',
  },
})
