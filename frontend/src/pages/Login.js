import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

const Login = ({ setUser, setError }) => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            return
        }

        axios.post('http://localhost:8080/login', {
            username: username,
            password: password
        }, {
            withCredentials: false,
            auth: null
        }).then(response => {
            if (!response.data.success) {
                setError({ status: 401, error: 'Unauthorized', message: response.data.message, path: '/login', timestamp: Date.now() })
                navigate('/error')
                return
            }

            setUser({
                username: username,
                password: password
            })
            navigate('/')
        })
    }

    return (
        <section className='col-lg-4'>
            <h4>Login</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-2' controlId='input-username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-2' controlId='input-password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Login
                </Button>
            </Form>
        </section>
    )

}

export default Login