import { styled } from 'leva/plugin'

export const Wrapper = styled('div', {
  position: 'relative',
  height: 80,
  width: '100%',
  marginBottom: '$sm',
})

export const ToolTip = styled('div', {
  position: 'absolute',
  top: -4,
  pointerEvents: 'none',
  fontFamily: '$mono',
  fontSize: 'calc($fontSizes$root * 0.9)',
  padding: '$xs $sm',
  color: '$toolTipBackground',
  backgroundColor: '$toolTipText',
  borderRadius: '$xs',
  whiteSpace: 'nowrap',
  transform: 'translate(-50%, -100%)',
  boxShadow: '$level2',
})

export const Canvas = styled('canvas', {
  height: '100%',
  width: '100%',
})

export const Dot = styled('div', {
  position: 'absolute',
  height: 6,
  width: 6,
  borderRadius: 6,
  backgroundColor: '$highlight3',
  pointerEvents: 'none',
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
