import { styled } from '../../styles'

const iconWidth = 40

export const Icon = styled('i', {
  $leva__flexCenter: '',
  width: iconWidth,
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
  variants: {
    mode: {
      drag: {
        cursor: 'grab',
      },
    },
  },
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

export const TitleContainer = styled('div', {
  $leva__flexCenter: '',
  flex: 1,
  '> svg': {
    fill: '$leva__highlight1',
  },
  color: '$leva__highlight1',
  variants: {
    drag: {
      true: {
        $leva__draggable: '',
        '> svg': {
          transition: 'fill 250ms ease',
        },
        '&:hover': {
          color: '$leva__highlight3',
        },
        '&:hover > svg': {
          fill: '$leva__highlight3',
        },
      },
    },
    filterEnabled: {
      false: {
        paddingRight: iconWidth,
      },
    },
  },
})
