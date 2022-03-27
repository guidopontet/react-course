import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="#">useContext</a>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/" className="nav-item nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-item nav-link">About</NavLink>
          <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
        </div>
      </div>
    </nav>
  )
}
