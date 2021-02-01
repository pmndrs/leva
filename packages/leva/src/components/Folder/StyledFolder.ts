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
        paddingLeft: '$rowH',
        '::after': {
          content: '""',
          position: 'absolute',
          left: 8,
          top: 0,
          width: '1px',
          height: '100%',
          backgroundColor: '$elevation1',
          transition: '$bg',
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
    cursor: 'pointer',
    marginRight: '4px',
    transition: 'transform 350ms ease, fill 250ms ease',
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
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '100%',
  gridRowGap: '$rowV',
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
      },
    },
    isRoot: {
      true: {
        padding: 'calc(2 * var(--space-rowV)) 0',
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
