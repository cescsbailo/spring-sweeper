const Home = ({user}) => {

    return (
        <section>
            <h4>Minesweeper</h4>
            {user && <p>Welcome, {user.username}</p>}
        </section>
    )

}

export default Home