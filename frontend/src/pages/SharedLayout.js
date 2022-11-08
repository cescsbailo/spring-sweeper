import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SharedLayout = ({ user }) => {

    return (
        <>
            <Navbar user={user} />
            <Outlet />
        </>
    )

}

export default SharedLayout