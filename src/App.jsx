import "./App.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Portfolio from "./Pages/Portfolio"
import TechArsenal from "./Pages/TechArsenal"
import ComicScrollbar from "./Components/ComicScrollbar"
import SmoothScroll from "./Components/SmoothScroll"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ComicScrollbar />
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
