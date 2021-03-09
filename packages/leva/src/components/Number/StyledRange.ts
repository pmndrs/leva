import { styled } from '../../styles'

export const Range = styled('div', {
  position: 'relative',
  width: '100%',
  height: 2,
  borderRadius: '$leva__xs',
  backgroundColor: '$leva__elevation1',
})

export const Scrubber = styled('div', {
  position: 'absolute',
  width: '$leva__scrubberWidth',
  height: '$leva__scrubberHeight',
  borderRadius: '$leva__xs',
  boxShadow: '0 0 0 2px $leva__elevation2',
  backgroundColor: '$leva__accent2',
  cursor: 'pointer',
  $leva__active: 'none $leva__accent1',
  $leva__hover: 'none $leva__accent3',
  variants: {
    position: {
      left: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        transform: 'translateX(calc(-0.5 * ($sizes$leva__scrubberWidth + 4px)))',
      },
      right: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        transform: 'translateX(calc(0.5 * ($sizes$leva__scrubberWidth + 4px)))',
      },
    },
  },
})

export const RangeWrapper = styled('div', {
  position: 'relative',
  $leva__flex: '',
  height: '100%',
  cursor: 'pointer',
  touchAction: 'none',
})

export const Indicator = styled('div', {
  position: 'absolute',
  height: '100%',
  backgroundColor: '$leva__accent2',
})
