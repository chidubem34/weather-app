import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { WeatherContextProvider } from './context/WeatherContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WeatherContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WeatherContextProvider>
  </React.StrictMode>,
)
