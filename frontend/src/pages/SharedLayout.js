import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

const SharedLayout = ({ user }) => {

    return (
        <>
            <Navigation user={user} />
            <Container>
                <Outlet />
            </Container>
        </>
    )

}

export default SharedLayout