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
  overflow: 'hidden',

  '> svg': {
    display: 'none',
    marginLeft: '$colGap',
    cursor: 'pointer',
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
  whiteSpace: 'nowrap',
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

export const Overlay = styled('div', {
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 1000,
})
