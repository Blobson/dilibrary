import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import './style/index.scss'
import './style/fonts/arimo/arimo.css'
import App from './components/App'
import CatalogProvider from './data/CatalogProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CatalogProvider>
        <App />
      </CatalogProvider>
    </BrowserRouter>
  </React.StrictMode>
)
