import { styled } from '../../styles'
import { StyledTitle } from '../Folder/StyledFolder'

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
    color: '$textDeEmphasized',
  },
})

export const Icon = styled('i', {
  width: 40,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  cursor: 'pointer',
  '> svg': {
    fill: '$textDeEmphasized',
  },
  ':hover > svg': {
    fill: '$textEmphasized',
  },
  variants: { active: { true: { '> svg': { fill: '$text' } } } },
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
