import { styled, keyframes } from 'leva/plugin'

export const Svg = styled('svg', {
  width: '100%',
  height: '$leva__controlWidth',
  marginTop: '$leva__rowGap',
  overflow: 'visible',
  zIndex: 100,
  '> path': {
    stroke: '$leva__highlight3',
    strokeWidth: 2,
  },
  g: {
    color: '$leva__accent1',
    '&:hover': { color: '$leva__accent3' },
    '&:active': { color: 'yellow' },
  },
  circle: {
    fill: 'currentColor',
    strokeWidth: 10,
    stroke: 'transparent',
    cursor: 'pointer',
  },
  '> line': {
    stroke: '$leva__highlight1',
    strokeWidth: 2,
  },
  '> g > line': {
    stroke: 'currentColor',
  },
})

const fadeIn = (o: number) =>
  keyframes({
    '10%': { opacity: 1 },
    '100%': { opacity: o },
  })

export const PreviewSvg = styled('svg', {
  width: '100%',
  overflow: 'visible',
  height: 6,
  '> circle': {
    opacity: 0,
    fill: 'yellow',
    cy: '50%',
    animation: `${fadeIn(0.4)} 1000ms forwards`,
    '&:first-of-type, &:last-of-type': {
      animationName: fadeIn(0.7),
    },
  },
})
