import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Form, FormGroup, FormLabel, Button } from 'react-bootstrap'

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

    const getMaxMines = useCallback(() => {
        return (rows - 1) * (columns - 1)
    }, [rows, columns])

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
    }, [getMaxMines])

    return (
        <section className='col-lg-4'>
            <Form onSubmit={startGame}>
                <FormGroup controlId='input-difficulty' className='mb-3'>
                    <FormLabel></FormLabel>
                    <Form.Select aria-label='Select Difficulty' onChange={selectDifficulty}>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                        <option value='custom'>Custom</option>
                    </Form.Select>
                </FormGroup>
                {custom &&
                    <fieldset className='mb-3'>
                        <FormGroup controlId='input-columns'>
                            <Form.Range min={minColumns} max={maxColumns} value={columns} onChange={updateColumns} />
                            <Form.Label>Columns: {columns}</Form.Label>
                        </FormGroup>
                        <FormGroup controlId='input-rows'>
                            <Form.Range min={minRows} max={maxRows} value={rows} onChange={updateRows} />
                            <Form.Label>Rows: {rows}</Form.Label>
                        </FormGroup>
                        <FormGroup controlId='input-mines'>
                            <Form.Range min={minMines} max={maxMines} value={mines} onChange={updateMines} />
                            <Form.Label>Mines: {mines}</Form.Label>
                        </FormGroup>
                    </fieldset>
                }
                <Button variant='primary' type='submit'>
                    Start
                </Button>
            </Form>
        </section>
    )

}

export default NewGame