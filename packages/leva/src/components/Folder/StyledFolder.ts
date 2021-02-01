import { styled } from '../../styles'

export const StyledWrapper = styled('div', {
  position: 'relative',
  background: '$elevation2',
  transition: 'height 350ms ease',
  variants: {
    isRoot: {
      true: {
        borderRadius: '$lg',
      },
      false: {
        '::after': {
          content: '""',
          position: 'absolute',
          left: 8,
          top: 0,
          width: '1px',
          height: '100%',
          backgroundColor: '$elevation1',
        },
      },
    },
    toggled: {
      false: {
        overflow: 'hidden',
      },
    },
  },
})

export const StyledTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  color: '$textEmphasized',
  paddingLeft: 'var(--borderWidths-folder)',
  userSelect: 'none',
  cursor: 'pointer',
  paddingTop: '$folderV',
  '> svg': {
    marginRight: '4px',
    transition: 'transform 300ms ease',
    fill: '$elevation3',
  },
})

export const StyledFolder = styled('div', {
  ':hover': {
    [`> ${StyledTitle} > svg`]: {
      fill: '$textDeEmphasized',
    },
    [`> ${StyledWrapper}::after`]: {
      backgroundColor: '$textDeEmphasized',
    },
  },
  variants: {
    isRoot: {
      true: {
        marginTop: 0,
      },
    },
  },
})

export const StyledContent = styled('div', {
  paddingTop: '$rowV',
  display: 'grid',
  gridTemplateColumns: '100%',
  gridRowGap: '$rowV',
  transition: 'opacity 250ms ease',
  [`& > ${StyledFolder}`]: {
    marginLeft: '$folderH',
  },
  variants: {
    toggled: {
      true: {
        opacity: 1,
        transitionDelay: '250ms',
      },
      false: {
        opacity: 0,
        transitionDelay: '0ms',
      },
    },
    isRoot: {
      true: {
        paddingBottom: 'calc(2 * var(--space-rowV))',
        [`& > ${StyledFolder}`]: {
          marginLeft: 0,

          [`& > ${StyledWrapper}`]: {
            borderWidth: 'calc(var(--borderWidths-folder) - var(--borderWidths-root))',
          },
        },
      },
    },
  },
})
