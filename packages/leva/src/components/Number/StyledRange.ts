import { styled } from '../../styles'

export const Range = styled('div', {
  position: 'relative',
  width: '100%',
  height: '2px',
  borderRadius: '$xs',
  backgroundColor: '$elevation1',
})

export const Scrubber = styled('div', {
  position: 'absolute',
  width: '$scrubberWidth',
  height: '$scrubberHeight',
  borderRadius: '$xs',
  boxShadow: '0 0 0 2px $elevation2',
  backgroundColor: '$accent2',
  cursor: 'pointer',
  ':active': {
    backgroundColor: '$accent1',
  },
  variants: {
    position: {
      left: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        transform: 'translateX(calc(-0.5 * ( var(--sizes-scrubberWidth) + 4px ) ))',
      },
      right: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        transform: 'translateX(calc(0.5 * ( var(--sizes-scrubberWidth) + 4px ) ))',
      },
    },
  },
})

export const RangeWrapper = styled('div', {
  position: 'relative',
  $flex: '',
  height: '100%',
  cursor: 'pointer',
  touchAction: 'none',
})

export const Indicator = styled('div', {
  position: 'absolute',
  height: '100%',
  backgroundColor: '$accent2',
})
