const Home = ({user}) => {

    return (
        <section className='section'>
            <h2>Minesweeper</h2>
            {user && <h3>Welcome, {user.username}</h3>}
        </section>
    )

}

export default Home