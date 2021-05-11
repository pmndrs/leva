import { styled, keyframes } from 'leva/plugin'

export const Svg = styled('svg', {
  width: '100%',
  height: '$controlWidth',
  marginTop: '$rowGap',
  overflow: 'visible',
  zIndex: 100,
  '> path': {
    stroke: '$highlight3',
    strokeWidth: 2,
  },
  g: {
    color: '$accent1',
    '&:hover': { color: '$accent3' },
    '&:active': { color: '$vivid1' },
  },
  circle: {
    fill: 'currentColor',
    strokeWidth: 10,
    stroke: 'transparent',
    cursor: 'pointer',
  },
  '> line': {
    stroke: '$highlight1',
    strokeWidth: 2,
  },
  '> g > line': {
    stroke: 'currentColor',
  },
  variants: {
    withPreview: { true: { marginBottom: 0 }, false: { marginBottom: '$rowGap' } },
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
    fill: '$vivid1',
    cy: '50%',
    animation: `${fadeIn(0.3)} 1000ms both`,
    '&:first-of-type': { animationName: fadeIn(0.7) },
    '&:last-of-type': { animationName: move },
  },
})

export const SyledInnerLabel = styled('div', {
  userSelect: 'none',
  $flexCenter: '',
  height: 14,
  width: 14,
  borderRadius: 7,
  marginRight: '$sm',
  cursor: 'pointer',
  fontSize: '0.8em',
  variants: {
    graph: { true: { backgroundColor: '$elevation1' } },
  },
})

export const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  alignItems: 'center',
})
