import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user }) => {

    return (
        <nav>
            <NavLink to='/'>Home</NavLink>
            {!user && <NavLink to='/login'>Login</NavLink>}
            {user && <NavLink to='/logout'>Logout</NavLink>}
            {user && <NavLink to='/games/new'>New Game</NavLink>}
            {user && <NavLink to='/games/list'>Game List</NavLink>}
        </nav>
    )

}

export default Navbar