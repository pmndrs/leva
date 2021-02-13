import React from 'react'
import createStyled from '@stitches/react'
import { useControls, Leva } from 'leva'

const { styled } = createStyled({
  theme: { colors: { hiContrast: 'lightblue' } },
})

const Box = styled('div', {
  background: 'red',
})

export default function App4() {
  useControls({ color: 'blue' })
  return <Box>Hello</Box>
}
