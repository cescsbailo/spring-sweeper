import React from 'react'
import { Link } from 'react-router-dom'

export default class Error extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <section className='section'>
                <h2>404</h2>
                <p>Page not found</p>
                <Link to='/' className='btn'>Home</Link>
            </section>
        )
    }
}