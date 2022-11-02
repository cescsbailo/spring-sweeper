import React from 'react'

const minRows = 9
const minColumns = 9
const maxRows = 24
const maxColumns = 30
const minMines = 10

const difficulties = {
    easy: {
        rows: 9,
        columns: 9,
        mines: 10
    },
    medium: {
        rows: 16,
        columns: 16,
        mines: 40
    },
    hard: {
        rows: 16,
        columns: 30,
        mines: 99
    },
    custom: {
        rows: minRows,
        columns: minColumns,
        mines: minMines
    }
}

const initialState = {
    rows: minRows,
    columns: minColumns,
    mines: minMines,
    maxMines: 0,
    username: 'user',
    password: 'password',
    custom: false
}

export default class FormSelection extends React.Component {

    constructor(props) {
        super(props)

        this.state = initialState

        this.updateRows = this.updateRows.bind(this)
        this.updateColumns = this.updateColumns.bind(this)
        this.updateMines = this.updateMines.bind(this)
        this.updateValues = this.updateValues.bind(this)
        this.getMaxMines = this.getMaxMines.bind(this)
        this.selectDifficulty = this.selectDifficulty.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.onStart = this.onStart.bind(this)
        this.onRestart = this.onRestart.bind(this)
    }

    updateRows = (e) => {
        this.updateValues(e.target.value, this.state.columns, this.state.mines)
    }

    updateColumns = (e) => {
        this.updateValues(this.state.rows, e.target.value, this.state.mines)
    }

    updateMines = (e) => {
        this.updateValues(this.state.rows, this.state.columns, e.target.value)
    }

    updateValues = (rows, columns, mines) => {
        const maxMines = this.getMaxMines(rows, this.state.columns)

        this.setState({
            columns: columns,
            rows: rows,
            mines: Math.min(mines, maxMines),
            maxMines: maxMines
        })
    }

    getMaxMines = (rows, columns) => {
        return (rows - 1) * (columns - 1)
    }

    selectDifficulty = (e) => {
        const difficulty = difficulties[e.target.value]
        this.setState({
            rows: difficulty.rows,
            columns: difficulty.columns,
            mines: difficulty.mines,
            custom: e.target.value === 'custom'
        })
    }

    setUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onStart = (e) => {
        e.preventDefault()
        this.props.startGame(this.state.rows, this.state.columns, this.state.mines, this.state.username, this.state.password)
    }

    onRestart = (e) => {
        e.preventDefault()
        this.setState(initialState)
        this.props.restart()
    }

    componentDidMount = () => {
        this.setState({
            maxMines: this.getMaxMines(this.state.rows, this.state.columns)
        })

    }

    render = () => {
        return (
            <form id="form-difficulty">
                {!this.props.started &&
                    <>
                        <label htmlFor="input-username">Username</label>
                        <input type="text" name="input-username" value={this.state.username} onChange={this.setUsername} />
                        <br />
                        <label htmlFor="input-password">Password</label>
                        <input type="password" name="input-password" value={this.state.password} onChange={this.setPassword} />
                        <br />
                        <label htmlFor="input-difficulty">Difficulty</label>
                        <select id="input-difficulty" onChange={this.selectDifficulty}>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                            <option value="custom">Custom</option>
                        </select>
                        {this.state.custom &&
                            <fieldset>
                                <input name="input-columns" type="range" min={minColumns} max={maxColumns} value={this.state.columns} onChange={this.updateColumns} />
                                <label htmlFor="input-columns">Columns: {this.state.columns}</label>
                                <br />
                                <input name="input-rows" type="range" min={minRows} max={maxRows} value={this.state.rows} onChange={this.updateRows} />
                                <label htmlFor="input-rows">Rows: {this.state.rows}</label>
                                <br />
                                <input name="input-mines" type="range" min={minMines} max={this.state.maxMines} value={this.state.mines} onChange={this.updateMines} />
                                <label htmlFor="input-mines">Mines: {this.state.mines}</label>
                                <br />
                            </fieldset>
                        }
                    </>
                }
                {!this.props.started && <button onClick={this.onStart}>Start</button>}
                <button onClick={(event) => {
                    event.preventDefault()
                    this.props.showList(this.state.username, this.state.password)
                }}>Show List</button>
                {this.props.started && <button onClick={this.onRestart}>Restart</button>}
            </form>
        )
    }
}