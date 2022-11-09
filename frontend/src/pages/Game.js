import { useParams } from 'react-router-dom'
import Board from '../components/Board'

const Game = () => {
    const { gameId } = useParams()

    return (
        <section className='d-flex justify-content-center' >
            <Board gameId={gameId} />
        </section>
    )
}

export default Game