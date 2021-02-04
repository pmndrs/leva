import { styled } from '../../styles'

export const StyledFolder = styled('div', {
  variants: {
    isRoot: {
      true: {
        borderRadius: '$lg',
        backgroundColor: '$elevation1',
        boxShadow: '$level1',
      },
    },
  },
})

export const StyledWrapper = styled('div', {
  position: 'relative',
  background: '$elevation2',
  transition: 'height 350ms ease',
  variants: {
    isRoot: {
      true: {
        borderRadius: '$lg',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 20px - 43px)',
      },
      false: {
        paddingLeft: '$md',
        '::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: 'var(--borderWidths-folder)',
          height: '100%',
          backgroundColor: '$elevation1',
          transform: 'translateX(-50%)',
        },
      },
    },
    toggled: {
      false: { overflow: 'hidden' },
    },
  },
})

export const StyledTitle = styled('div', {
  $flex: '',
  color: '$highlight3',
  userSelect: 'none',
  cursor: 'pointer',
  marginTop: '$rowGap',
  height: '$folderHeight',
  fontWeight: '$folder',
  '> svg': {
    marginLeft: -4,
    marginRight: 4,
    cursor: 'pointer',
    fill: '$highlight1',
  },
  ':hover > svg': {
    fill: '$highlight2',
  },
  [`:hover + ${StyledWrapper}::after`]: {
    backgroundColor: '$highlight2',
  },
  [`${StyledFolder}:hover > & + ${StyledWrapper}::after`]: {
    backgroundColor: '$highlight1',
  },
  [`${StyledFolder}:hover > & > svg`]: {
    fill: '$highlight1',
  },
  variants: {
    toggled: { false: {} },
  },
})

export const StyledContent = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '100%',
  gridRowGap: '$rowGap',
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
          paddingBottom: '$sm',
        },
        [`> ${StyledFolder}:not(:first-of-type)`]: {
          paddingTop: '$md',
          marginTop: '$md',
          borderTop: '$folder solid $elevation1',
        },
      },
    },
  },
})
