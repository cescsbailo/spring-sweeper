import { useEffect } from 'react'

const Error = ({ error }) => {

    useEffect(() => {

    })

    if (!error) {
        return
    }

    return (
        <section className='section'>
            <h4>{error.status} : {error.error}</h4>
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
        </section>
    )

}

export default Error