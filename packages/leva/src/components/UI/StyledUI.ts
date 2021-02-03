import { styled } from '../../styles'
import { StyledContent } from '../Folder/StyledFolder'

export const Row = styled('div', {
  position: 'relative',
  display: 'grid',
  gridRowGap: '$rowGap',
  gridTemplateRows: 'minmax(var(--sizes-rowHeight), max-content)',
  alignItems: 'center',
  color: '$highlight2',

  [`${StyledContent} > &`]: {
    ':first-of-type': { marginTop: '$rowGap' },
    ':last-of-type': { marginBottom: '$rowGap' },
  },

  variants: {
    input: {
      true: {
        gridTemplateColumns: 'auto var(--sizes-controlWidth)',
        gridColumnGap: '$colGap',
      },
    },
  },
})

export const CopyLabelContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  cursor: 'pointer',
  overflow: 'hidden',

  '> label': {
    cursor: 'pointer',
  },

  '> svg': {
    position: 'absolute',
    right: 4,
    opacity: 0,
    marginLeft: '$colGap',
    width: 15,
    minWidth: 15,
    height: 15,
    backgroundColor: '$elevation2',
  },
  '&:hover > svg': {
    opacity: 1,
  },
})

export const StyledLabel = styled('label', {
  color: '$highlight2',
  fontWeight: '$label',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})
