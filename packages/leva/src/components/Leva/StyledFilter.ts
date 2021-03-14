import { styled } from '../../styles'

export const Icon = styled('i', {
  $leva__flexCenter: '',
  width: 40,
  WebkitUserSelect: 'none', // TODO remove when stitches fixes prefix import
  userSelect: 'none',
  cursor: 'pointer',
  '> svg': {
    fill: '$leva__highlight1',
    transition: 'transform 350ms ease, fill 250ms ease',
  },
  '&:hover > svg': {
    fill: '$leva__highlight3',
  },
  variants: { active: { true: { '> svg': { fill: '$leva__highlight2' } } } },
})

export const StyledTitleWithFilter = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  height: '$leva__titleBarHeight',
  cursor: 'grab',
})

export const FilterWrapper = styled('div', {
  $leva__flex: '',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  transition: 'height 250ms ease',
  color: '$leva__highlight3',
  paddingLeft: '$leva__md',

  [`> ${Icon}`]: {
    height: 30,
  },

  variants: {
    toggled: { true: { height: 30 }, false: { height: 0 } },
  },
})

export const StyledFilterInput = styled('input', {
  $leva__reset: '',
  flex: 1,
  position: 'relative',
  height: 30,
  width: '100%',
  backgroundColor: 'transparent',
  fontSize: '10px',
  borderRadius: '$leva__root',
  '&:focus': {},
  '&::placeholder': {
    color: '$leva__highlight2',
  },
})

export const Drag = styled('div', {
  $leva__flexCenter: '',
  $leva__draggable: '',
  flex: 1,
  '> svg': {
    fill: '$leva__highlight1',
    transition: 'fill 250ms ease',
  },
  '&:hover > svg': {
    fill: '$leva__highlight3',
  },
})
