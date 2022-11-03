import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({setUser}) => {

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!username || !password){
            return
        }
        
        setUser({
            username : username,
            password : password
        })
        
        navigate('/games')
    }

    return (
        <section className='section'>
            <h4>Login</h4>
            <form onSubmit={handleSubmit}>
                    <label htmlFor='input-username'>Username</label>
                    <input type='text' name='input-username' onChange={(e)=>setUsername(e.target.value)} />
                    <br />
                    <label htmlFor='input-password'>Password</label>
                    <input type='password' name='input-password' onChange={(e)=>setPassword(e.target.value)}  />
                    <br />
                    <input type='submit' value='Login'></input>
                </form>
        </section>
    )

}

export default Login