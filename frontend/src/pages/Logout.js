import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Logout = ({user, setUser, setError}) => {

    const navigate = useNavigate()

    useEffect(() =>{
        axios.post('http://localhost:8080/exit', {
            username: user.username,
            password: user.password
        }, {
            withCredentials: false,
            auth: null
        }).then(response =>{
            if (!response.data.success) {
                setError({ status: 401, error: 'Unauthorized', message: response.data.message, path: '/logout', timestamp: Date.now() })
                navigate('/error')
                return
            }

            setUser(null)
        })
    })
    
    return <Navigate to='/' replace />

}

export default Logout