import { styled } from '../../styles/stitches.config'

export const Range = styled('div', {
  position: 'relative',
  width: '100%',
  height: '2px',
  borderRadius: '1px',
  backgroundColor: '$primary',
})

export const Scrubber = styled('div', {
  position: 'absolute',
  width: '$scrubberWidth',
  height: '$scrubberHeight',
  borderRadius: '$input',
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
