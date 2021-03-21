import { styled } from '../../styles'

export const RangeGrid = styled('div', {
  variants: {
    hasRange: {
      true: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto $sizes$leva__numberInputMinWidth',
        columnGap: '$leva__colGap',
        alignItems: 'center',
      },
    },
  },
})
