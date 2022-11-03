import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const Board = ({ gameId }) => {

    const smileCool = <>&#128526;</>
    const smileHappy = <>&#128578;</>
    const smileWorry = <>&#128558;</>
    const smileSad = <>&#128577;</>
    const question = <>&#10067;</>
    const flag = <>&#128681;</>
    const bomb = <>&#128163;</>
    const skull = <>&#128128;</>
    const dice = <>&#127922;</>

    const colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

    const [gameData, setGameData] = useState(null)
    const [smile, setSmile] = useState(smileHappy)
    const [cells, setCells] = useState([])
    const [time, setTime] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [currentCell, setCurrentCell] = useState(null)

    const stateRef = useRef(cells)

    const handleClickDown = (e) => {
        e.preventDefault()

        if (e.target.nodeName.toLowerCase() !== 'td' || gameData.won || gameData.lost) {
            return
        }

        let row = parseInt(e.target.dataset.row)
        let column = parseInt(e.target.dataset.column)

        let currentCell = cells[row][column]
        if (currentCell.visited) {
            return
        }

        let cells = cells.map(cell => {
            if (cell.row === row && cell.column === column) {
                return { ...cell, state: 'clicked' }
            }
            return cell
        })

        setCurrentCell(currentCell)
        setCells(cells)
        setSmile(smileWorry)
    }

    const handleClickUp = (e) => {
        e.preventDefault()

        if (e.target.nodeName.toLowerCase() !== 'td' || gameData.won || gameData.lost || currentCell.visited) {
            return
        }

        let startHandler = gameData.startDate ? noAction : startGame
        let clickHandler = e.button === 2 ? flagCell : discoverCell

        let row = parseInt(e.target.dataset.row)
        let column = parseInt(e.target.dataset.column)

        console.log(currentCell)

        startHandler(row, column).then(clickHandler)
    }

    const noAction = async (row, column) => {
        return Promise.resolve({ row, column })
    }

    const startGame = async (row, column) => {
        return axios.put('/game/' + gameData.gameId)
            .then(response => {
                setGameData({
                    ...gameData,
                    won: response.data.won,
                    lost: response.data.lost,
                    discoveredCells: response.data.discoveredCells,
                    flaggedMines: response.data.flaggedMines,
                    startDate: response.data.startDate
                })
                setTime(0)
                return { row, column }
            })
    }

    const discoverCell = async (response) => {
        axios.put('/board/' + gameData.boardId + '/cell/' + response.row + '/' + response.column + '/discover')
            .then(response => {
                let updatedCells = []
                response.data.cells.forEach(c => {
                    let currentCell = { ...cells[c.row][c.column] }
                    if (c.bomb) {
                        currentCell.content = bomb
                    }
                    if (c.flagged) {
                        currentCell.content = flag
                    } else if (c.marked) {
                        currentCell.content = question
                    } else if (c.nearBombs != 0) {
                        currentCell.content = c.nearBombs
                    }

                    currentCell.visited = true
                    currentCell.state = 'visited ' + colors[c.nearBombs - 1]
                    updatedCells.push(currentCell)
                })

                let cells = this.state.cells.map(oldCell => {
                    const newCell = updatedCells.find(c => c.row === oldCell.row && c.column === oldCell.column)
                    return newCell ? { ...oldCell, ...newCell } : oldCell
                })

                let smile = smileHappy
                let lost = false
                let won = false
                if (response.data.lose) {
                    smile = skull
                    lost = true
                } else if (response.data.won) {
                    smile = smileCool
                    won = true
                }

                setGameData({
                    ...gameData,
                    won: won,
                    lost: lost,
                    discoveredCells: response.data.discoveredCells,
                    totalMines: response.data.totalMines
                })
                setSmile(smile)
                setCurrentCell(null)
            })
    }

    const flagCell = async (response) => {
        axios.put('/board/' + this.state.boardId + '/cell/' + response.row + '/' + response.column + '/flag')
            .then(response => {
                let row = response.data.row
                let column = response.data.column
                let cells = this.state.cells.map(oldCell => {
                    if (oldCell.row === row && oldCell.column === column) {
                        let cell = { ...oldCell }
                        if (response.data.flagged) {
                            cell.content = flag
                        } else if (response.data.marked) {
                            cell.content = question
                        } else {
                            cell.content = ''
                        }
                        cell.state = 'normal'
                        return cell
                    }
                    return oldCell
                })

                setGameData({
                    cells: cells,
                    discoveredCells: response.data.discoveredCells,
                    totalMines: response.data.totalMines
                })
                setSmile(smileHappy)
                setCurrentCell(null)
            })
    }

    const disableMenu = async (e) => {
        e.preventDefault()

        return false
    }

    useEffect(() => {
        axios.get('game/' + gameId)
            .then(response => {
                let rows = response.data.cells
                let cells = []

                rows.forEach(r => {
                    let row = []
                    r.forEach(cell => {
                        row.push({ row: cell.row, column: cell.column, state: 'normal', content: '' })
                    })
                    cells.push(row)
                })

                console.log(cells)

                setCells(cells)
                setGameData(response.data)
                setLoaded(true)
            })
    }, [])

    if (!loaded) {
        return <div>Loading...</div>
    }

    return (
        <table className='board' onMouseDown={handleClickDown} onMouseUp={handleClickUp} onContextMenu={disableMenu}>
            <thead>
                <tr>
                    <th colSpan='3'>{gameData.totalMines}</th>
                    <th colSpan={gameData.columns - 6}>{smile}</th>
                    <th colSpan='3'>{time}</th>
                </tr>
            </thead>
            <tbody>
                {cells.map((row, i) => {
                    return (
                        <tr key={i}>{
                            row.map(cell => {
                                return (
                                    <td key={cell.row + '-' + cell.column} data-row={cell.row} data-column={cell.column} className={cell.state}>{cell.content}</td>
                                )
                            }
                            )}
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    )

}

export default Board