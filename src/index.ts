import React from 'react'

export * from './useControls'
export * from './helpers/'
export { register } from './register'
export { Leva } from './components/Leva/'
export { useInputContext } from './context'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    // trackAllPureComponents: true,
  })
}
