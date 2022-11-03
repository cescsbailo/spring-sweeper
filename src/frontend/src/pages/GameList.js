import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const GameList = () => {
    const [gameList, setGameList] = useState([])

    useEffect(() => {
        console.log('loadGames')
        axios.get('/game').then(response => {
            setGameList(response.data.games)
        })
    }, [])

    return (
        <section className='section'>
            <h1>game list</h1>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Game</th>
                        <th>Rows</th>
                        <th>Columns</th>
                        <th>Mines</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Time</th>
                        <th>Won</th>
                        <th>Lost</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gameList.map(game => (
                            <tr key={game.gameId}>
                                <td>{game.player}</td>
                                <td><Link to={'/games/' + game.gameId}>{game.gameId}</Link></td>
                                <td>{game.rows}</td>
                                <td>{game.columns}</td>
                                <td>{game.mines}</td>
                                <td>{game.startDate}</td>
                                <td>{game.endDate}</td>
                                <td>{game.duration}</td>
                                <td>{game.won}</td>
                                <td>{game.lost}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}

export default GameList