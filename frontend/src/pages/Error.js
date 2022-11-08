import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Error = ({ error }) => {

    useEffect(() => {

    })

    if (!error) {
        return
    }

    return (
        <section className='section'>
            <h2>{error.status} : {error.error}</h2>
            <p>
                <dl>
                    <dt>Timestamp</dt>
                    <dd>{new Date(error.timestamp).toLocaleString('it-IT')}</dd>
                    <dt>Path</dt>
                    <dd>{error.path}</dd>
                    <dt>Message</dt>
                    <dd>{error.message}</dd>
                </dl>
            </p>
            <Link to='/' className='btn'>Home</Link>
        </section>
    )

}

export default Error