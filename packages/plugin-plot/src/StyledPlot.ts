import { styled } from 'leva/plugin'

export const Wrapper = styled('div', {
  position: 'relative',
  height: 80,
  width: '100%',
  marginBottom: '$leva__sm',
})

export const ToolTip = styled('div', {
  position: 'absolute',
  top: -4,
  pointerEvents: 'none',
  fontFamily: '$leva__mono',
  fontSize: 'calc($fontSizes$leva__root * 0.9)',
  padding: '$leva__xs $leva__sm',
  color: '$leva__toolTipBackground',
  backgroundColor: '$leva__toolTipText',
  borderRadius: '$leva__xs',
  whiteSpace: 'nowrap',
  transform: 'translate(-50%, -100%)',
  boxShadow: '$leva__level2',
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
  backgroundColor: '$leva__accent1',
  pointerEvents: 'none',
})
