import { styled } from '../../styles'
import { StyledContent } from '../Folder/StyledFolder'

export const Row = styled('div', {
  position: 'relative',
  display: 'grid',
  gridRowGap: '$rowV',
  gridTemplateRows: 'minmax(var(--sizes-rowHeight), max-content)',
  alignItems: 'center',

  [`${StyledContent} > &`]: {
    padding: '0 $rowH',
    ':first-of-type': { marginTop: '$rowV' },
    ':last-of-type': { marginBottom: '$rowV' },
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

export const StyledLabel = styled('label', {
  paddingLeft: '$rowH',
  color: '$labelText',
  fontWeight: '$label',
  touchAction: 'none',
})
