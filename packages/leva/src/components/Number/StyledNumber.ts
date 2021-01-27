import { styled } from '../../styles/stitched'

export const RangeGrid = styled('div', {
  variants: {
    hasRange: {
      true: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        gridColumnGap: '$colGap',
        alignItems: 'center',
      },
    },
  },
})
