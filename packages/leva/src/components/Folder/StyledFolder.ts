import { styled } from '../../styles'

export const StyledTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  color: '$textEmphasized',
  paddingLeft: 'var(--borderWidths-folder)',
  userSelect: 'none',
  cursor: 'pointer',
  '& > svg': {
    marginRight: '4px',
    transition: 'transform 300ms ease',
  },
  variants: {
    isRoot: {
      true: {
        height: '43px',
      },
      false: {
        paddingTop: '$folderV',
      },
    },
  },
})

export const StyledFolder = styled('div', {
  variants: {
    isRoot: {
      true: {
        marginTop: 0,
      },
    },
  },
})

export const StyledWrapper = styled('div', {
  position: 'relative',
  background: '$elevation2',
  overflow: 'hidden',
  transition: 'height 350ms ease',
  variants: {
    isRoot: {
      true: {
        borderRadius: '0 0 $lg $lg',
      },
      false: {
        '::after': {
          content: '""',
          position: 'absolute',
          left: 8,
          top: 0,
          width: '1px',
          height: '100%',
          background: '$elevation1',
        },
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
