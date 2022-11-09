import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const GameList = () => {
    const [gameList, setGameList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const [trophy] = useState(<i className='bi-trophy'/>)
    const [lost] = useState(<i className='bi-fire'/>)

    const deleteGame = (gameId) => {
        axios.delete('/game/' + gameId)
            .then(response => {
                let list = gameList.filter(g => g.gameId !== gameId)
                setGameList(list)
            })
    }

    useEffect(() => {
        axios.get('/game').then(response => {
            setGameList(response.data.games)
            setLoaded(true)
        })
    }, [])

    if (!loaded) {
        return <div>Loading...</div>
    }

    return (
        <Table hover size='sm'>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Game</th>
                    <th>Rows</th>
                    <th>Columns</th>
                    <th>Mines</th>
                    <th>Time</th>
                    <th>Status</th>
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
                            <td>{game.won ? trophy : (game.lost ? lost : '')}</td>
                            <td><Button variant='danger' onClick={() => deleteGame(game.gameId)}><i className='bi-trash'/></Button></td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default GameList