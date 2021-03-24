import { styled } from '../../styles'

export const StyledFolder = styled('div', {})

export const StyledWrapper = styled('div', {
  position: 'relative',
  background: '$leva__elevation2',
  transition: 'height 300ms ease',
  variants: {
    fill: { true: {}, false: {} },
    flat: { false: {}, true: {} },
    isRoot: {
      true: {},
      false: {
        paddingLeft: '$leva__md',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '$borderWidths$leva__folder',
          height: '100%',
          backgroundColor: '$leva__elevation3',
          transform: 'translateX(-50%)',
        },
      },
    },
  },
  compoundVariants: [
    {
      isRoot: true,
      fill: false,
      css: {
        overflowY: 'auto',
        // 20px accounts for top margin
        maxHeight: 'calc(100vh - 20px - $$titleBarHeight)',
      },
    },
    {
      isRoot: true,
      flat: false,
      css: { borderRadius: '$leva__lg' },
    },
  ],
})

export const StyledTitle = styled('div', {
  $leva__flex: '',
  color: '$leva__highlight3',
  userSelect: 'none',
  cursor: 'pointer',
  height: '$leva__folderTitleHeight',
  fontWeight: '$leva__folder',
  '> svg': {
    marginLeft: -4,
    marginRight: 4,
    cursor: 'pointer',
    fill: '$leva__highlight1',
  },
  '&:hover > svg': {
    fill: '$leva__highlight2',
  },
  [`&:hover + ${StyledWrapper}::after`]: {
    backgroundColor: '$leva__highlight2',
  },
  [`${StyledFolder}:hover > & + ${StyledWrapper}::after`]: {
    backgroundColor: '$leva__highlight1',
  },
  [`${StyledFolder}:hover > & > svg`]: {
    fill: '$leva__highlight1',
  },
})

export const StyledContent = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '100%',
  rowGap: '$leva__rowGap',
  transition: 'opacity 250ms ease',
  variants: {
    toggled: {
      true: {
        opacity: 1,
        transitionDelay: '250ms',
      },
      false: {
        opacity: 0,
        transitionDelay: '0ms',
        pointerEvents: 'none',
      },
    },
    isRoot: {
      true: {
        '& > div': {
          paddingLeft: '$leva__md',
          paddingRight: '$leva__md',
        },
        '& > div:first-of-type': {
          paddingTop: '$leva__sm',
        },
        '& > div:last-of-type': {
          paddingBottom: '$leva__sm', // adds an extra padding at the very bottom of the root folder
        },
        [`> ${StyledFolder}:not(:first-of-type)`]: {
          paddingTop: '$leva__sm',
          marginTop: '$leva__md',
          borderTop: '$borderWidths$leva__folder solid $colors$leva__elevation1',
        },
      },
    },
  },
})
