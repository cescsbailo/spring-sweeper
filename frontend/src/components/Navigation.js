import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

const Navigation = ({ user }) => {

    return (
        <Navbar variant='dark' bg='dark' expand='lg' fixed='top'>
            <Container>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
                        {user && <Nav.Link as={NavLink} to='/games/new'>New Game</Nav.Link>}
                        {user && <Nav.Link as={NavLink} to='/games/list'>Game List</Nav.Link>}
                        {!user && <Nav.Link as={NavLink} to='/login'>Login</Nav.Link>}
                    </Nav>
                    <Nav className='ms-auto'>
                        {user && <Nav.Link as={NavLink} to='/logout'>Logout: {user.username}</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>  
            </Container>
        </Navbar>
    )

}

export default Navigation