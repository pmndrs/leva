import { Arrow } from '@radix-ui/react-tooltip'
import { styled } from '../../styles'
import { StyledContent } from '../Folder/StyledFolder'

export const StyledRow = styled('div', {
  position: 'relative',
  zIndex: 100,
  display: 'grid',
  rowGap: '$leva__rowGap',
  gridTemplateRows: 'minmax($sizes$leva__rowHeight, max-content)',
  alignItems: 'center',
  color: '$leva__highlight2',

  [`${StyledContent} > &`]: {
    '&:first-of-type': { marginTop: '$leva__rowGap' },
    '&:last-of-type': { marginBottom: '$leva__rowGap' },
  },

  '&:hover,&:focus-within': {
    color: '$leva__highlight3',
  },
})

export const StyledInputRow = styled(StyledRow, {
  gridTemplateColumns: 'auto $sizes$leva__controlWidth',
  columnGap: '$leva__colGap',
})

export const CopyLabelContainer = styled('div', {
  $leva__flex: '',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',

  '& > div': {
    marginLeft: '$leva__colGap',
    padding: '0 $xs',
    opacity: 0.4,
  },
  '& > div:hover': {
    opacity: 0.8,
  },

  '& > div > svg': {
    display: 'none',
    cursor: 'pointer',
    width: 13,
    minWidth: 13,
    height: 13,
    backgroundColor: '$leva__elevation2',
  },
  '&:hover > div > svg': { display: 'block' },

  variants: {
    align: {
      top: {
        height: '100%',
        alignItems: 'flex-start',
        paddingTop: '$leva__sm',
      },
    },
  },
})

export const StyledOptionalToggle = styled('input', {
  $leva__reset: '',
  height: 0,
  width: 0,
  opacity: 0,
  margin: 0,

  '& + label': {
    position: 'relative',
    $leva__flexCenter: '',
    height: '100%',
    userSelect: 'none',
    cursor: 'pointer',
    paddingLeft: 2,
    paddingRight: '$leva__sm',
    pointerEvents: 'auto',
  },

  '& + label:after': {
    content: '""',
    width: 6,
    height: 6,
    backgroundColor: '$leva__elevation3',
    borderRadius: '50%',
    $leva__activeStyle: '',
  },

  '&:focus + label:after': { $leva__focusStyle: '' },

  '& + label:active:after': {
    backgroundColor: '$leva__accent1',
    $leva__focusStyle: '',
  },

  '&:checked + label:after': {
    backgroundColor: '$leva__accent1',
  },
})

export const StyledInputWrapper = styled('div', {
  opacity: 1,
  variants: {
    disabled: {
      true: { opacity: 0.6, pointerEvents: 'none' },
    },
  },
})

export const StyledLabel = styled('label', {
  fontWeight: '$leva__label',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '& > svg': {
    display: 'block', // fixes svg vertical misalignment
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

export const StyledToolTipContent = styled('div', {
  background: '$leva__toolTipBackground',
  fontFamily: '$leva__sans',
  fontSize: '$leva__toolTip',
  padding: '$leva__xs $leva__sm',
  color: '$leva__toolTipText',
  borderRadius: '$leva__xs',
  boxShadow: '$leva__level2',
})

export const ToolTipArrow = styled(Arrow, {
  fill: '$leva__toolTipBackground',
})
