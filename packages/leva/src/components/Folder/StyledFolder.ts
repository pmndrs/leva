import { styled } from '../../styles'

export const StyledFolder = styled('div', {})

export const StyledWrapper = styled('div', {
  position: 'relative',
  background: '$elevation2',
  transition: 'height 300ms ease',
  variants: {
    fill: { true: {}, false: {} },
    flat: { false: {}, true: {} },
    isRoot: {
      true: {},
      false: {
        paddingLeft: '$md',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '$borderWidths$folder',
          height: '100%',
          backgroundColor: '$elevation3',
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
      css: { borderRadius: '$lg' },
    },
  ],
})

export const StyledTitle = styled('div', {
  $flex: '',
  color: '$highlight3',
  userSelect: 'none',
  cursor: 'pointer',
  height: '$folderTitleHeight',
  fontWeight: '$folder',
  '> svg': {
    marginLeft: -4,
    marginRight: 4,
    cursor: 'pointer',
    fill: '$highlight1',
  },
  '&:hover > svg': {
    fill: '$highlight2',
  },
  [`&:hover + ${StyledWrapper}::after`]: {
    backgroundColor: '$highlight2',
  },
  [`${StyledFolder}:hover > & + ${StyledWrapper}::after`]: {
    backgroundColor: '$highlight1',
  },
  [`${StyledFolder}:hover > & > svg`]: {
    fill: '$highlight1',
  },
})

export const StyledContent = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '100%',
  rowGap: '$rowGap',
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
          paddingLeft: '$md',
          paddingRight: '$md',
        },
        '& > div:first-of-type': {
          paddingTop: '$sm',
        },
        '& > div:last-of-type': {
          paddingBottom: '$sm', // adds an extra padding at the very bottom of the root folder
        },
        [`> ${StyledFolder}:not(:first-of-type)`]: {
          paddingTop: '$sm',
          marginTop: '$md',
          borderTop: '$borderWidths$folder solid $colors$elevation1',
        },
      },
    },
  },
})
