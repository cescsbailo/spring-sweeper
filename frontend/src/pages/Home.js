import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <section className='section'>
                <h2>home</h2>
                <p>Minesweeper</p>
            </section>
        )
    }
}