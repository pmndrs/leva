import React from 'react'
import ReactDOM from 'react-dom'

import { App1 as App } from './App'
// import App from './TestRenderApp'
import './styles.css'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
