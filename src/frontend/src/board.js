import React from "react"
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

const colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

const initialState = {
    cells: null,
    gameId: null,
    boardId: null,
    totalCells: null,
    discoveredCells: null,
    rows: null,
    columns: null,
    mines: null,
    flaggedMines: null,
    startDate: null,
    time: 0,
    won: null,
    lost: null,
    click: null,
    lastCell: null,
    smile: null
}

export default class Board extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rows: 0,
            columns: 0,
            mines: 0,
            cells: [],
            time: 0
        }

        this.createBoard = this.createBoard.bind(this)
        this.renderGrid = this.renderGrid.bind(this)
        this.getCell = this.getCell.bind(this)
        this.handleClickDown = this.handleClickDown.bind(this)
        this.handleClickUp = this.handleClickUp.bind(this)
        this.noAction = this.noAction.bind(this)
        this.startGame = this.startGame.bind(this)
        this.flagCell = this.flagCell.bind(this)
        this.discoverCell = this.discoverCell.bind(this)
        this.disableMenu = this.disableMenu.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    createBoard = (response) => {
        this.props.showError(null)

        let rows = response.data.rows
        let columns = response.data.columns

        let cells = []
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                cells.push({ row: r, column: c, state: 'normal' })
            }
        }

        this.setState({
            gameId: response.data.gameId,
            boardId: response.data.boardId,
            totalCells: response.data.totalCells,
            rows: response.data.rows,
            columns: response.data.columns,
            mines: response.data.totalMines,
            cells: cells,
            smile: smileHappy
        })
    }

    getCell = (row, column) => {
        let index = parseInt(row) * this.state.columns + parseInt(column)
        return this.state.cells[index]
    }

    renderGrid = () => {
        let rows = []

        for (let r = 0; r < this.state.rows; r++) {

            let cells = []
            for (let c = 0; c < this.state.columns; c++) {
                let index = r * this.state.columns + c
                let cell = <td key={r + '-' + c} data-row={r} data-column={c} className={this.state.cells[index].state}>{this.state.cells[index].content}</td>
                cells.push(cell)
            }

            let row = <tr key={r}>{cells}</tr>
            rows.push(row)
        }

        return rows
    }

    handleError = (error) => {
        if (error.response) {
            this.props.showError({
                status: error.response.status,
                error: error.response.data.error,
                message: error.response.data.message,
                path: error.response.data.path,
                timestamp: error.response.data.timestamp,
                trace: error.response.data.trace
            })
        } else if (error.request) {
            console.log(error.request)
        } else {
            console.log('Error', error.message)
        }
        console.log(error.config)
    }

    handleClickDown = (event) => {
        event.preventDefault()

        if (event.target.nodeName.toLowerCase() !== 'td' || this.state.won || this.state.lost) {
            return
        }

        let row = event.target.dataset.row
        let column = event.target.dataset.column

        let currentCell = this.getCell(row, column)
        if (currentCell.visited) {
            return
        }

        let cells = this.state.cells.map(cell => {
            if (cell.row === row && cell.column === column) {
                return { ...cell, state: 'clicked' }
            }
            return cell
        })

        this.setState({
            cells: cells,
            smile: smileWorry
        })

        return
    }

    handleClickUp = (event) => {
        event.preventDefault()

        if (event.target.nodeName.toLowerCase() !== 'td' || this.state.won || this.state.lost) {
            console.log('return')
            return
        }

        let row = event.target.dataset.row
        let column = event.target.dataset.column

        let currentCell = this.getCell(row, column)
        if (currentCell.visited) {
            return
        }

        let startHandler = this.state.startDate ? this.noAction : this.startGame
        let clickHandler = event.button === 2 ? this.flagCell : this.discoverCell

        startHandler(row, column).then(clickHandler)
    }

    noAction = (row, column) => {
        return Promise.resolve({ row, column })
    }

    startGame = async (row, column) => {
        return axios.put('/game/' + this.state.gameId).then(response => {
            this.setState({
                won: response.data.won,
                lost: response.data.lost,
                discoveredCells: response.data.discoveredCells,
                flaggedMines: response.data.flaggedMines,
                startDate: response.data.startDate,
                time: 0
            })
            return { row, column }
        }).catch(this.handleError)
    }

    discoverCell = async (response) => {
        return axios.put('/board/' + this.state.boardId + '/cell/' + response.row + '/' + response.column + '/discover')
            .then(response => {
                let updatedCells = []
                response.data.cells.forEach(c => {
                    let currentCell = { ... this.getCell(c.row, c.column) }
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

                this.setState({
                    cells: cells,
                    discoveredCells: response.data.discoveredCells,
                    mines: response.data.totalMines,
                    smile: smile,
                    lost: lost,
                    won: won
                })
            })
            .catch(this.handleError)
    }

    flagCell = async (response) => {
        return axios.put('/board/' + this.state.boardId + '/cell/' + response.row + '/' + response.column + '/flag')
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

                this.setState({
                    cells: cells,
                    mines: response.data.totalMines,
                    smile: smileHappy
                })
            })
            .catch(this.handleError)
    }

    disableMenu = (event) => {
        event.preventDefault()

        return false
    }

    componentDidMount = () => {
        axios.get('/game/' + this.props.gameId)
            .then(this.createBoard)
            .catch(this.handleError)
    }

    render = () => {
        return (
            <table onMouseDown={this.handleClickDown} onMouseUp={this.handleClickUp} onContextMenu={this.disableMenu}>
                <thead>
                    <tr>
                        <th colSpan="3">{this.state.mines}</th>
                        <th colSpan={this.state.columns - 6}>{this.state.smile}</th>
                        <th colSpan="3">{this.state.time}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderGrid()}
                </tbody>
            </table>
        )
    }
}