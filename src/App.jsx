// Root component: sets up routing and mounts the app-wide scroll and analytics behavior.
// Routes: "/" -> Portfolio, "/arsenal" -> TechArsenal, "/hackathons" -> HackathonLog,
// anything else redirects to "/".
import "./App.css"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Portfolio from "./Pages/Portfolio"
import TechArsenal from "./Pages/TechArsenal"
import HackathonLog from "./Pages/HackathonLog"
import ComicScrollbar from "./Components/ComicScrollbar"
import SmoothScroll from "./Components/SmoothScroll"
import ScrollReveal from "./Components/ScrollReveal"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <ScrollReveal />
      <ComicScrollbar />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/arsenal" element={<TechArsenal />} />
        <Route path="/hackathons" element={<HackathonLog />} />
        {/* Anything unknown falls back to the portfolio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
