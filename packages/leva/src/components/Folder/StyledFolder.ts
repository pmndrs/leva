import { styled } from '../../styles'

export const StyledTitle = styled('div', {
  display: 'flex',
  alignItems: 'center',
  color: '$folderText',
  fontWeight: '$folder',
  backgroundColor: '$folderTitleBg',
  padding: '$rowV $rowH $rowV',
  paddingLeft: 'var(--borderWidths-folder)',
  userSelect: 'none',
  cursor: 'pointer',
  '& > i': {
    height: '10px',
    width: '10px',
    borderRadius: '5px',
    backgroundColor: '$folderText',
    marginRight: '4px',
    transition: 'transform 300ms ease',
    '::after': {
      content: '""',
      display: 'block',
      position: 'relative',
      left: '2px',
      top: '4px',
      borderRadius: '1px',
      height: '2px',
      width: '6px',
      backgroundColor: '$folderTitleBg',
    },
  },
})

export const StyledFolder = styled('div', {
  marginTop: '$folderV',
  '& + &': { marginTop: 'calc(-var(--spaces-rowV))' },
  variants: {
    root: {
      true: {
        marginTop: 0,
        [`& > ${StyledTitle}`]: {
          borderRadius: '$root $root 0 0',
        },
      },
    },
  },
})

export const StyledWrapper = styled('div', {
  variants: {
    root: {
      true: {
        borderStyle: 'solid',
        borderWidth: '$root',
        borderColor: '$rootBorder',
      },
      false: {
        borderLeftStyle: 'solid',
        borderLeftWidth: '$folder',
        borderLeftColor: '$folderBorder',
      },
    },
  },
})

export const StyledContent = styled('div', {
  paddingTop: '$rowV',
  display: 'grid',
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
    root: {
      true: {
        [`& > ${StyledFolder}`]: {
          marginLeft: 0,
          '&:first-of-type': {
            marginTop: '-$rowV',
            [`> ${StyledTitle}`]: {
              borderRadius: '$root $root 0 0',
            },
          },

          [`& > ${StyledWrapper}`]: {
            borderWidth: 'calc(var(--borderWidths-folder) - var(--borderWidths-root))',
          },
        },
      },
    },
  },
})
