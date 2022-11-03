import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Logout = ({setUser}) => {

    useEffect(() =>{
        setUser(null)
    })
    
    return <Navigate to='/' replace />

}

export default Logout