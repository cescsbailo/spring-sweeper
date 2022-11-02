import './App.css'
import React from 'react'
import axios from 'axios'
import FormSelection from './form'
import Board from './board'
import ErrorMessage from './error'
import GameList from './GameList'

const initialState = {
  gameId: null,
  error: null
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = initialState

    this.startGame = this.startGame.bind(this)
    this.restart = this.restart.bind(this)
    this.showError = this.showError.bind(this)
    this.loadGame = this.loadGame.bind(this)
  }

  setAxiosDefault = (username, password) => {
    axios.defaults.baseURL = 'http://localhost:8080/api/v1';
    axios.defaults.withCredentials = true
    axios.defaults.auth = {
      username: username,
      password: password
    }
  }

  startGame = (rows, columns, mines, username, password) => {
    this.setAxiosDefault(username, password)

    axios.post('/game', {
      rows: parseInt(rows),
      columns: parseInt(columns),
      mines: parseInt(mines)
    })
      .then(response => {
        this.loadGame(response.data.gameId)
      })
      .catch(this.showError)
  }

  restart = () => {
    this.setState(initialState)
  }

  showError = (error) => {
    this.setState({
      error: error
    })
  }

  onShowList = (username, password) => {
    this.setAxiosDefault(username, password)

    axios.get('/game').then(response => {
      this.setState({
        games : response.data.games,
        error : null,
        started : false
      })
    }).catch(this.showError)
  }

  loadGame = (gameId) => {
    this.setState({
      games: null,
      started: true,
      gameId : gameId,
      error : null
    })
  }

  render = () => {
    return (
      <>
        <div className="center-container">
          <FormSelection startGame={this.startGame} restart={this.restart} started={this.state.started} showList={this.onShowList}></FormSelection>
          {this.state.gameId &&
            <Board gameId={this.state.gameId} showError={this.showError}></Board>
          }
          {this.state.games && <GameList games={this.state.games} loadGame={this.loadGame}></GameList>}
        </div>
        {this.state.error && <><hr></hr><ErrorMessage error={this.state.error}></ErrorMessage></>}
      </>
    )
  }

}