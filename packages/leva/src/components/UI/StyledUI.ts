import { styled } from '../../styles'
import { StyledContent } from '../Folder/StyledFolder'

export const StyledRow = styled('div', {
  position: 'relative',
  display: 'grid',
  rowGap: '$rowGap',
  gridTemplateRows: 'minmax($sizes$rowHeight, max-content)',
  alignItems: 'center',
  color: '$highlight2',

  [`${StyledContent} > &`]: {
    '&:first-of-type': { marginTop: '$rowGap' },
    '&:last-of-type': { marginBottom: '$rowGap' },
  },

  '&:hover,&:focus-within': {
    color: '$highlight3',
  },
})

export const StyledInputRow = styled(StyledRow, {
  gridTemplateColumns: 'auto $sizes$controlWidth',
  columnGap: '$colGap',
})

export const CopyLabelContainer = styled('div', {
  $flex: '',
  height: '100%',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',

  '> label': {
    cursor: 'pointer',
  },

  '> svg': {
    display: 'none',
    marginLeft: '$colGap',
    width: 15,
    minWidth: 15,
    height: 15,
    backgroundColor: '$elevation2',
  },
  '&:hover > svg': {
    display: 'block',
  },
})

export const StyledLabel = styled('label', {
  fontWeight: '$label',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  variants: {
    align: {
      top: {
        height: '100%',
        alignItems: 'flex-start',
        paddingTop: '$sm',
      },
    },
  },
})
