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
  borderColor: '$elevation2',
  backgroundColor: '$accent',
  cursor: 'pointer',
})

export const RangeWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  margin: '0 $input',
  cursor: 'pointer',
  touchAction: 'none',
})

export const Indicator = styled('div', {
  position: 'absolute',
  height: '100%',
  backgroundColor: '$accent',
})
