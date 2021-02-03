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
  alignItems: 'stretch',
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
  position: 'relative',
  height: 30,
  width: '100%',
  padding: '0 $rowH',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  color: '$highlight3',
  fontFamily: 'inherit',
  fontSize: '10px',
  borderRadius: '$root',
  '&:focus': {},
  '::placeholder': {
    color: '$highlight2',
  },
})

export const Icon = styled('i', {
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
  cursor: 'pointer',
  '> svg': {
    fill: '$highlight1',
    transition: 'transform 350ms ease, fill 250ms ease',
  },
  ':hover > svg': {
    fill: '$highlight3',
  },
  variants: { active: { true: { '> svg': { fill: '$highlight2' } } } },
})

export const Drag = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  '> svg': {
    fill: '$highlight1',
    transition: 'fill 250ms ease',
  },
  ':hover > svg': {
    fill: '$highlight3',
  },
})
