import { styled } from '../../styles'

export const Icon = styled('i', {
  $flexCenter: '',
  width: 40,
  userSelect: 'none',
  cursor: 'pointer',
  '> svg': {
    fill: '$highlight1',
    transition: 'transform 350ms ease, fill 250ms ease',
  },
  '&:hover > svg': {
    fill: '$highlight3',
  },
  variants: { active: { true: { '> svg': { fill: '$highlight2' } }, false: {} } },
})

export const StyledTitleWithFilter = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  height: '43px',
  cursor: 'grab',
})

export const FilterWrapper = styled('div', {
  $flex: '',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  transition: 'height 250ms ease',
  color: '$highlight3',
  paddingLeft: '$md',

  [`> .${Icon}`]: {
    height: 30,
  },

  variants: {
    toggled: { true: { height: 30 }, false: { height: 0 } },
  },
})

export const StyledFilterInput = styled('input', {
  $reset: '',
  flex: 1,
  position: 'relative',
  height: 30,
  width: '100%',
  backgroundColor: 'transparent',
  fontSize: '10px',
  borderRadius: '$root',
  '&:focus': {},
  '&::placeholder': {
    color: '$highlight2',
  },
})

export const Drag = styled('div', {
  $flexCenter: '',
  $draggable: '',
  flex: 1,
  '> svg': {
    fill: '$highlight1',
    transition: 'fill 250ms ease',
  },
  '&:hover > svg': {
    fill: '$highlight3',
  },
})
