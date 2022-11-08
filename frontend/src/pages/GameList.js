import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const GameList = () => {
    const [gameList, setGameList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const deleteGame = (gameId) =>{
        axios.delete('/game/' + gameId)
        .then(response => {
            let list = gameList.filter(g => g.gameId != gameId)
            setGameList(list)
        })
    }

    useEffect(() => {
        axios.get('/game').then(response => {
            setGameList(response.data.games)
            setLoaded(true)
        })
    }, [])

    if(!loaded){
        return <div>Loading...</div>
    }

    return (
        <section className='section'>
            <h1>game list</h1>
            <table className='game-list'>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Game</th>
                        <th>Rows</th>
                        <th>Columns</th>
                        <th>Mines</th>
                        <th>Time</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Delete</th>
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
                                <td>{parseInt(Math.round(game.time / 1000))}s</td>
                                <td>{game.won?'Yes':'No'}</td>
                                <td>{game.lost?'Yes':'No'}</td>
                                <td><button onClick={()=>deleteGame(game.gameId)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}

export default GameList