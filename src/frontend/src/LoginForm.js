import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";

export default class LoginForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: "",
            password: "",
            success : false,
            error : null
        }
    }

    setUsername = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    
    setPassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    performLogin = (e) =>{
        e.preventDefault()

        axios.post('http://localhost:8080/login', {
            username : this.state.username,
            password : this.state.password
        }).then(response => {
            console.log(response)
            let success = response.data.success
            if(success){
                this.props.letLogin(this.state.username, this.state.password)
                this.setState({
                    success : true,
                    error : null
                })    
            }else{
                this.setState({
                    success : false,
                    error : {
                        'message' : 'Invalid Credentials'
                    }
                })
            }
            this.setState({
                success : success,
                error : null
            })
        }).catch(error => {
            this.setState({
                success : false,
                error : error
            })
        })
        
    }

    render = ()=>{
        let { success, error } = this.state
        return (
            <>
                {error && <ErrorMessage error={error} />}
                {success && (
                    <Navigate to="/" replace={true} />
                )}
                <form>
                    <label htmlFor="input-username">Username</label>
                    <input type="text" name="input-username" value={this.state.username} onChange={this.setUsername} />
                    <br />
                    <label htmlFor="input-password">Password</label>
                    <input type="password" name="input-password" value={this.state.password} onChange={this.setPassword} />
                    <br />
                    <button onClick={this.performLogin}>Login</button>
                </form>
            </>
        )
    }
}