import React from 'react'
import axios from 'axios'

const smileCool = <>&#128526;</>
const smileHappy = <>&#128578;</>
const smileWorry = <>&#128558;</>
const smileSad = <>&#128577;</>
const question = <>&#10067;</>
const flag = <>&#128681;</>
const bomb = <>&#128163;</>
const skull = <>&#128128;</>
const dice = <>&#127922;</>

const colors = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

class Board extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            gameData: {},
            currentCell: {},
            cells: [],
            time: 0,
            loaded: false,
            smile: smileHappy,
            timer : null
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

        let currentCell = {...this.state.cells[row][column]}
        if (currentCell.visited) {
            return
        }

        let cells = this.state.cells.map(row => [...row])
        cells[row][column].state = 'clicked'

        this.setState({
            currentCell: currentCell,
            cells: cells,
            smile: smileWorry
        })
    }

    handleClickUp = (e) => {
        e.preventDefault()

        if (e.target.nodeName.toLowerCase() !== 'td' || this.state.gameData.won || this.state.gameData.lost || this.state.currentCell.visited) {
            return
        }

        let startHandler = this.state.gameData.startDate ? this.noAction : this.startGame
        let clickHandler = e.button === 2 ? this.flagCell : this.discoverCell

        let row = parseInt(e.target.dataset.row)
        let column = parseInt(e.target.dataset.column)

        console.log(this.state.currentCell)

        startHandler(row, column).then(clickHandler)
    }

    noAction = (row, column) => {
        return Promise.resolve({ row, column })
    }

    startGame = (row, column) => {
        return axios.put('/game/' + this.props.gameId)
            .then(response => {
                let timer = setInterval(this.countTime, 1000)
                this.setState({
                    gameData : {
                        ...this.state.gameData,
                        startDate: response.data.startDate,
                    },
                    timer : timer
                })
                return { row, column }
            })
    }

    countTime = () => {
        this.setState({
            time : this.state.time + 1
        })
    }

    discoverCell = (response) => {
        let row = response.row
        let column = response.column
        axios.put('/board/' + this.state.gameData.boardId + '/cell/' + row + '/' + column + '/discover')
            .then(response => {
                let cells = this.state.cells.map(row => [...row])
                response.data.cells.forEach(c => {
                    let currentCell = cells[c.row][c.column]
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
                    currentCell.state = 'visited ' + colors[c.nearBombs]
                })

                let timer = this.state.timer
                let smile = smileHappy
                if (response.data.lose) {
                    smile = skull
                    clearInterval(timer)
                    timer = null
                } else if (response.data.won) {
                    smile = smileCool
                }

                this.setState({
                    smile: smile,
                    currentCell: {},
                    cells: cells,
                    timer: timer,
                    gameData: {
                        ...this.state.gameData,
                        won: response.data.won,
                        lost: response.data.lost,
                        discoveredCells: response.data.cells.length
                    }
                })
            })
    }

    flagCell = (response) => {
        let row = response.row
        let column = response.column
        axios.put('/board/' + this.state.gameData.boardId + '/cell/' + row + '/' + column + '/flag')
            .then(response => {
                let cells = this.state.cells.map(row => [...row])
                let cell = cells[row][column]
                      
                if (response.data.flagged) {
                    cell.content = flag
                } else if (response.data.marked) {
                    cell.content = question
                } else {
                    cell.content = ''
                }
                cell.state = 'normal'
                      
                this.setState({
                    smile: smileHappy,
                    currentCell: {},
                    cells: cells,
                    gameData: {
                        ...this.state.gameData,
                        discoveredCells: response.data.discoveredCells,
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
                let rows = response.data.cells
                let cells = []

                rows.forEach(r => {
                    let row = []
                    r.forEach(cell => {
                        row.push({ row: cell.row, column: cell.column, state: 'normal', content: '' })
                    })
                    cells.push(row)
                })

                let time = response.data.duration || 0
                let startDate = response.data.startDate || null
                let timer = null
                if(startDate && time > 0){
                    timer = setInterval(this.countTime, 1000)
                }

                this.setState({
                    cells: cells,
                    gameData: response.data,
                    time : time,
                    loaded: true,
                    timer : timer
                })
            })
    }
    render = () => {
        if (!this.state.loaded) {
            return <div>Loading...</div>
        }

        return (
            <table className='board' onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onContextMenu={this.disableMenu} >
                <thead>
                    <tr>
                        <th colSpan='3'>{this.state.gameData.totalMines}</th>
                        <th colSpan={this.state.gameData.columns - 6}>{this.state.smile}</th>
                        <th colSpan='3'>{this.state.time}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.cells.map((row, i) => {
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

}

export default Board