import React from "react";

export default class GameList extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <ul>
                {
                    this.props.games.map((game, i) => {
                        return <li><button key={i} onClick={() => this.props.loadGame(game)}>Load {game}</button></li>
                    })
                }
            </ul>
        )
    }
}