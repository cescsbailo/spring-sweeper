import React from 'react'
import axios from 'axios'

const smileCool = <>&#128526;</>
const smileHappy = <>&#128578;</>
const smileWorry = <>&#128558;</>
const question = <>&#10067;</>
const flag = <>&#128681;</>
const bomb = <>&#128163;</>
const skull = <>&#128128;</>
//const dice = <>&#127922;</>
//const smileSad = <>&#128577;</>

const colors = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

class Board extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            gameData: {
                cells: []
            },
            currentCell: {},
            loaded: false,
            started: false,
            ended: false,
            smile: smileHappy,
            time: 0,
            timer: null
        }

        this.handleClickDown = this.handleClickDown.bind(this)
        this.handleClickUp = this.handleClickUp.bind(this)
        this.noAction = this.noAction.bind(this)
        this.startGame = this.startGame.bind(this)
        this.discoverCell = this.discoverCell.bind(this)
        this.flagCell = this.flagCell.bind(this)
        this.disableMenu = this.disableMenu.bind(this)
        this.countTime = this.countTime.bind(this)
    }

    handleClickDown = (e) => {
        e.preventDefault()

        if (e.target.nodeName.toLowerCase() !== 'td' || this.state.gameData.won || this.state.gameData.lost) {
            return
        }

        let row = parseInt(e.target.dataset.row)
        let column = parseInt(e.target.dataset.column)

        let currentCell = { ...this.state.gameData.cells[row][column] }
        if (currentCell.visited) {
            return
        }

        let cells = this.state.gameData.cells.map(row => [...row])
        cells[row][column].state = 'clicked'

        this.setState({
            gameData: { ...this.state.gameData, cells: cells },
            smile: smileWorry
        })
    }

    handleClickUp = (e) => {
        e.preventDefault()

        if (e.target.nodeName.toLowerCase() !== 'td' || this.state.gameData.won || this.state.gameData.lost) {
            return
        }

        let row = parseInt(e.target.dataset.row)
        let column = parseInt(e.target.dataset.column)

        let currentCell = { ...this.state.gameData.cells[row][column] }
        if (currentCell.visited) {
            return
        }

        let startHandler = this.state.started ? this.noAction : this.startGame
        let clickHandler = e.button === 2 ? this.flagCell : this.discoverCell

        startHandler(row, column).then(clickHandler)
    }

    noAction = (row, column) => {
        return Promise.resolve({ row, column })
    }

    startGame = async (row, column) => {
        return axios.put('/game/' + this.props.gameId)
            .then(response => {
                let timer = this.state.timer
                if (!timer) {
                    timer = setInterval(this.countTime, 1000)
                }
                this.setState({
                    gameData: {
                        ...this.state.gameData,
                        startDate: response.data.startDate,
                    },
                    timer: timer,
                    started: true
                })
                return { row, column }
            })
    }

    countTime = () => {
        if (this.state.started && !this.state.ended) {
            this.setState({
                time: this.state.time + 1
            })
        }
    }

    discoverCell = (cell) => {
        let row = cell.row
        let column = cell.column
        axios.put('/board/' + this.state.gameData.boardId + '/cell/' + row + '/' + column + '/discover')
            .then(response => {
                let won = response.data.won
                let lost = response.data.lost

                let cells = this.state.gameData.cells.map(row => [...row])
                response.data.cells.forEach(c => {
                    let currentCell = cells[c.row][c.column]
                    if (c.bomb) {
                        currentCell.content = bomb
                    } else if (c.flagged) {
                        currentCell.content = flag
                    } else if (c.marked) {
                        currentCell.content = question
                    } else if (c.nearBombs !== 0) {
                        currentCell.content = c.nearBombs
                    }
                    if (c.visited || won || lost) {
                        currentCell.visited = c.visited
                        currentCell.state = 'visited ' + colors[c.nearBombs]
                    }
                })


                let timer = this.state.timer
                let ended = this.state.ended
                let smile = lost ? skull : (won ? smileCool : smileHappy)
                if (lost || won) {
                    clearInterval(timer)
                    timer = null
                    ended = true
                }

                this.setState({
                    smile: smile,
                    timer: timer,
                    ended: ended,
                    gameData: {
                        ...this.state.gameData,
                        cells: cells,
                        won: won,
                        lost: lost
                    }
                })
            })
    }

    flagCell = (cell) => {
        let row = cell.row
        let column = cell.column
        axios.put('/board/' + this.state.gameData.boardId + '/cell/' + row + '/' + column + '/flag')
            .then(response => {
                let cells = this.state.gameData.cells.map(row => [...row])
                let cell = cells[row][column]

                if (response.data.flagged) {
                    cell.content = flag
                } else if (response.data.marked) {
                    cell.content = question
                } else {
                    cell.content = ''
                }

                cell.state = ''

                this.setState({
                    smile: smileHappy,
                    gameData: {
                        ...this.state.gameData,
                        cells: cells,
                        totalMines: response.data.totalMines
                    }
                })
            })
    }

    disableMenu = (e) => {
        e.preventDefault()

        return false
    }

    componentDidMount = () => {
        axios.get('game/' + this.props.gameId)
            .then(response => {
                let won = response.data.won
                let lost = response.data.lost

                let started = response.data.startDate
                let ended = won || lost

                response.data.cells.forEach(row => {
                    row.forEach(cell => {
                        if (cell.bomb && ended) {
                            cell.content = bomb
                            cell.state = 'visited'
                        } else if (cell.flagged) {
                            cell.content = flag
                        } else if (cell.marked) {
                            cell.content = question
                        } else if (cell.nearBombs !== 0 && started && (cell.visited || ended )) {
                            cell.content = cell.nearBombs
                        } else {
                            cell.content = ''
                        }

                        if ( ( cell.visited || ended ) && !cell.flagged && !cell.marked) {
                            cell.state = 'visited ' + colors[cell.nearBombs]
                        }
                    })
                })

                let timer = null
                if (started && !ended) {
                    timer = setInterval(this.countTime, 1000)
                }

                let smile = lost ? skull : (won ? smileCool : smileHappy)

                this.setState({
                    gameData: response.data,
                    smile: smile,
                    time: parseInt(Math.round(response.data.time / 1000)),
                    started: started,
                    ended: ended,
                    loaded: true,
                    timer: timer
                })
            })
    }

    componentWillUnmount = () => {
        if (this.state.ended) {
            return
        }
        axios.put('game/' + this.props.gameId + '/pause')
            .then(response => {
                let timer = this.state.timer
                clearInterval(timer)
            })
    }

    render = () => {
        if (!this.state.loaded) {
            return <div>Loading...</div>
        }

        return (
            <table className='board' onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onContextMenu={this.disableMenu}>
                <thead>
                    <tr>
                        <th colSpan='3'>{this.state.gameData.totalMines || 0}</th>
                        <th colSpan={this.state.gameData.columns - 6}>{this.state.smile}</th>
                        <th colSpan='3'>{this.state.time || 0}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.gameData.cells.map((row, i) => {
                        return (
                            <tr key={i}>{
                                row.map(cell => {
                                    return (
                                        <td key={cell.row + '-' + cell.column} data-row={cell.row} data-column={cell.column} className={cell.state}>{cell.content || ''}</td>
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

}

export default Board