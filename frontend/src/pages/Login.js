import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
            navigate('/games')
        })
    }

    return (
        <section className='section'>
            <h4>Login</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor='input-username'>Username</label>
                <input type='text' name='input-username' onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label htmlFor='input-password'>Password</label>
                <input type='password' name='input-password' onChange={(e) => setPassword(e.target.value)} />
                <br />
                <input type='submit' value='Login'></input>
            </form>
        </section>
    )

}

export default Login