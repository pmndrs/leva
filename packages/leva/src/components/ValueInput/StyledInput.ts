import { styled } from '../../styles'

export const StyledInput = styled('input', {
  /* input reset */
  $leva__reset: '',
  padding: '0 $leva__sm',
  width: 0,
  minWidth: 0,
  height: '$leva__rowHeight',
  flex: 1,

  variants: { levaType: { number: { textAlign: 'right', paddingLeft: '$leva__xs' } } },
})

export const InnerLabel = styled('div', {
  height: '100%',
  '& > :first-of-type': {
    $leva__flexCenter: '',
    width: 14,
    height: '100%',
    marginRight: '-$leva__sm',
    textTransform: 'uppercase',
    fontSize: '0.8em',
    opacity: 0.3,
    '&:hover': { opacity: 0.8 },
  },
  [`& + ${StyledInput}`]: {
    paddingLeft: 0,
  },
})

export const InputContainer = styled('div', {
  $leva__flex: '',
  borderRadius: '$leva__sm',
  color: 'inherit',
  backgroundColor: '$leva__elevation3',
  $leva__inputStyle: '$leva__elevation1',
  $leva__hover: '',
  $leva__focusWithin: '',
})
