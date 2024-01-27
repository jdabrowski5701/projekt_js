import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    return (
        <nav className="navbar">
        </nav>
        )
    }
    
    export default Navbar