import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Game = () => {
    const { gameId } = useParams()
    return (
        <section className='section'>
            <h1>game {gameId}</h1>
        </section>
    )
}

export default Game