import "./App.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Portfolio from "./Pages/Portfolio"
import TechArsenal from "./Pages/TechArsenal"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/arsenal" element={<TechArsenal />} />
        {/* Anything unknown falls back to the portfolio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
