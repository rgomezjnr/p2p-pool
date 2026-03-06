import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App(){
  return (
    <div className="app">
      <header>
        <h1>P2P Pool</h1>
        <nav>
          <Link to="/">Profile</Link> | <Link to="/match">Match</Link> | <Link to="/stats">Stats</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
