import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NewGame = () => {
    const navigate = useNavigate()

    const [minRows] = useState(9)
    const [maxRows] = useState(24)
    const [rows, setRows] = useState(minRows)

    const [minColumns] = useState(9)
    const [maxColumns] = useState(30)
    const [columns, setColumns] = useState(minColumns)

    const [minMines] = useState(10)
    const [maxMines, setMaxMines] = useState(0)
    const [mines, setMines] = useState(minMines)

    const [custom, setCustom] = useState(false)

    const [difficulties] = useState({
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
    })

    const updateRows = async (e) => {
        updateValues(e.target.value, columns, mines)
    }

    const updateColumns = async (e) => {
        updateValues(rows, e.target.value, mines)
    }

    const updateMines = async (e) => {
        updateValues(rows, columns, e.target.value)
    }

    const updateValues = (rows, columns, mines) => {
        const maxMines = getMaxMines(rows, columns)

        setRows(rows)
        setColumns(columns)
        setMines(Math.min(mines, maxMines))
        setMaxMines(maxMines)
    }

    const getMaxMines = () => {
        return (rows - 1) * (columns - 1)
    }

    const selectDifficulty = async (e) => {
        const difficulty = difficulties[e.target.value]
        setRows(difficulty.rows)
        setColumns(difficulty.columns)
        setMines(difficulty.mines)
        setCustom(e.target.value === 'custom')
    }

    const startGame = async (e) => {
        e.preventDefault()

        axios.post('/game', {
            rows: rows,
            columns: columns,
            mines: mines
        }).then(response => {
            navigate('/games/' + response.data.gameId)
        })

    }

    useEffect(() => {
        setMaxMines(getMaxMines())
    }, [rows, columns])

    return (
        <form id='form-difficulty' onSubmit={startGame}>
            <label htmlFor='input-difficulty'>Difficulty</label>
            <select id='input-difficulty' onChange={selectDifficulty}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
                <option value='custom'>Custom</option>
            </select>
            {custom &&
                <fieldset>
                    <input name='input-columns' type='range' min={minColumns} max={maxColumns} value={columns} onChange={updateColumns} />
                    <label htmlFor='input-columns'>Columns: {columns}</label>
                    <br />
                    <input name='input-rows' type='range' min={minRows} max={maxRows} value={rows} onChange={updateRows} />
                    <label htmlFor='input-rows'>Rows: {rows}</label>
                    <br />
                    <input name='input-mines' type='range' min={minMines} max={maxMines} value={mines} onChange={updateMines} />
                    <label htmlFor='input-mines'>Mines: {mines}</label>
                    <br />
                </fieldset>
            }
            <input type='submit' value='Start' />
        </form>
    )

}

export default NewGame