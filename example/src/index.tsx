import React from 'react'
import ReactDOM from 'react-dom'
// import { App3 as App } from './App'
// import App from './TestRenderApp'
import App from './MultipleStores'
import './styles.css'

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render')
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//     // logOnDifferentValues: true,
//   })
// }

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
