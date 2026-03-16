import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4';

import './index.css'
import App from './App.jsx'

ReactGA.default.initialize("G-8BPGZKZ0MV");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
