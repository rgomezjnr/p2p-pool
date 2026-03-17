// Polyfill Buffer for libraries that expect Node globals (e.g. bip39)
import { Buffer } from 'buffer'
if (!globalThis.Buffer) (globalThis as any).Buffer = Buffer

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import App from './App'
import Profile from './pages/Profile'
import Match from './pages/Match'
import Stats from './pages/Stats'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<Profile/>} />
          <Route path="match" element={<Match/>} />
          <Route path="stats" element={<Stats/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
