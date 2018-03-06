import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'

import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import HomeView from './components/HomeView'
import Login from './components/Login'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
