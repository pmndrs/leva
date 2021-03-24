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
    '&:active': { color: '$leva__vivid1' },
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
    '0%': { opacity: 0 },
    '10%': { opacity: 0.8 },
    '100%': { opacity: o },
  })

const move = keyframes({
  '0%': { transform: 'translateX(5%)' },
  '100%': { transform: 'translateX(95%)' },
})

export const PreviewSvg = styled('svg', {
  width: '100%',
  overflow: 'visible',
  height: 6,
  '> circle': {
    fill: '$leva__vivid1',
    cy: '50%',
    animation: `${fadeIn(0.3)} 1000ms both`,
    '&:first-of-type': { animationName: fadeIn(0.7) },
    '&:last-of-type': { animationName: move },
  },
})

export const SyledInnerLabel = styled('div', {
  WebkitUserSelect: 'none',
  userSelect: 'none',
  $leva__flexCenter: '',
  height: 14,
  width: 14,
  borderRadius: 7,
  marginRight: '$leva__sm',
  cursor: 'pointer',
  fontSize: '0.8em',
  variants: {
    graph: { true: { backgroundColor: '$leva__elevation1' } },
  },
})

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  alignItems: 'center',
})
