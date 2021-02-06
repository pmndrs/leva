import React from 'react'
import ReactDOM from 'react-dom'

import { App3 as App } from './App'
import './styles.css'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
