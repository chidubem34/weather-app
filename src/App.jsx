// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import SearchResult from './pages/SearchResult'
import SavedLocations from './pages/SavedLocations'

const App = () => {
  return (
    <Routes>
      <Route path="/weather-app" element={<Home />} />
      <Route path="/search-result" element={<SearchResult />} />
      <Route path="/saved-locations/" element={<SavedLocations />} />
    </Routes>
  )
}

export default App