import { styled } from '../../styles'

export const InnerNumberLabel = styled('div', {
  $leva__draggable: '',
  cursor: 'ew-resize',
  height: '100%',
  variants: {
    dragging: { true: { backgroundColor: '$leva__accent2' } },
  },
})

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
