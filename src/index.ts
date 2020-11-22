import React from 'react'

export * from './useTwix'
export * from './helpers/'
export { register } from './register'
export { Twix } from './components/Twix/'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, {
    // trackAllPureComponents: true,
  })
}
