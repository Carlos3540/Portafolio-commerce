import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Portfolio from '../index.jsx' // 1. Importas tu portafolio

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Portfolio /> {/* 2. Cambias <App /> por <Portfolio /> */}
  </StrictMode>,
)