import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Imported last, after every component stylesheet, so the shared button
// material layers over the comic styling rather than under it.
import './ComponentStyles/TactileButtons.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
