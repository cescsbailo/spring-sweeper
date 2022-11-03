import './App.css'
import React from 'react'
import axios from 'axios'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import FormSelection from './FormSelection'
import Board from './Board'
import ErrorMessage from './ErrorMessage'
import GameList from './GameList'
import LoginForm from './LoginForm'
import ErrorBoundary from './ErrorBoundary'
import { HomeLayout } from './HomeLayout'
import { ProtectedLayout } from './ProtectedLayout'

const initialState = {
  games: [],
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
        games: response.data.games,
        error: null,
        started: false
      })
    }).catch(this.showError)
  }

  loadGame = (gameId) => {
    this.setState({
      games: [],
      started: true,
      gameId: gameId,
      error: null
    })
  }

  render = () => {
    return (
      <ErrorBoundary>
        <div className="center-container">
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/login" element={<LoginForm setLogin={this.setAxiosDefault} />} />
            </Route>
            <Route path="/error" element={<ErrorMessage error={this.state.error} />} />
            <Route path="/games" element={<ProtectedLayout />}>
              <Route path="list" element={<GameList games={this.state.games} loadGame={this.loadGame} />} />
              <Route path="new" element={<FormSelection startGame={this.startGame} restart={this.restart} started={this.state.started} showList={this.onShowList} />} />
              <Route path="board" element={<Board gameId={this.state.gameId} showError={this.showError} />} />
            </Route>
          </Routes>
        </div>
      </ErrorBoundary>
    )
  }

}