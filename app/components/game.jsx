import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

import {choosePlayer, updateBoard, gameFinished, resetGame, isWinner} from 'actions'
import Announcement from 'announcement'
import Switcher from 'switcher'
import ResetButton from 'reset-button'

import Board from 'board'

class Game extends PureComponent {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.choosePlayer = this.choosePlayer.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.action = this.action.bind(this)
  }

  componentDidUpdate() {
    this.gameLoop(this.props.player)
  }

  choosePlayer(player) {
    this.props.dispatch(choosePlayer(player))
  }

  resetGame() {
    this.props.dispatch(resetGame())
  }

  action(x, y) {
    const position = y * 3 + x
    this.gameLoop(this.props.player, position)
  }

  copyBoard(board) {
    return board.slice(0)
  }

  validMove(move, player, board) {
    const newBoard = this.copyBoard(board)

    if (newBoard[move] === ' ') {
      newBoard[move] = player
      return newBoard
    } else {
      return null
    }
  }

  findAIMove(board) {
    let bestMoveScore = 10
    let move = null

    if (isWinner(board)) {
      return null
    }

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.props.minPlayer, board)

      if (newBoard) {
        let moveScore = this.maxScore(newBoard)
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore
          move = i
        }
      }
    }

    return move
  }

  minScore(board) {
    const score = this.getScore(board)
    if (score !== null) {
        return score
    }

    let bestMoveValue = 10
    for (let i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.props.minPlayer, board)

      if (newBoard) {
        let predictedMoveValue = this.maxScore(newBoard)
        if (predictedMoveValue < bestMoveValue) {
          bestMoveValue = predictedMoveValue
        }
      }
    }

    return bestMoveValue
  }

  maxScore(board) {
    const score = this.getScore(board)
    if (score !== null) {
        return score
    }

    let bestMoveValue = -10
    for (let i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.props.maxPlayer, board)

      if (newBoard) {
        let predictedMoveValue = this.minScore(newBoard)
        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue
        }
      }
    }

    return bestMoveValue
  }

  getScore(board) {
    if (isWinner(board) === this.props.maxPlayer) {
      return 1
    } else if (isWinner(board) === this.props.minPlayer) {
      return -1
    } else if (isWinner(board) === 'draw') {
      return 0
    }

    return null
  }

  gameLoop(player, move = null) {
    const winner = isWinner(this.props.gameBoard)
    if (winner) {
      this.props.dispatch(gameFinished(winner))
    } else if (player === this.props.maxPlayer && move !== null) {
      let valid = this.validMove(move, player, this.props.gameBoard)
      if (valid) {
        this.props.dispatch(updateBoard(move, player))
      }
    } else if (player === this.props.minPlayer) {
      move = this.findAIMove(this.props.gameBoard)
      let valid = this.validMove(move, player, this.props.gameBoard)
      if (valid) {
        setTimeout(() => {
          this.props.dispatch(updateBoard(move, player))
        }, 600)
      }
    }
  }

  render() {
    const {player, winner, gameBoard} = this.props

    return (
      <div className="tic-tac-toe">
        <Announcement winner={winner}/>
        <Switcher on={player === 'o' ? true: false} onClick={() => this.choosePlayer(player === 'x' ? 'o' : 'x')}/>

        <Board action={this.action} player={player} gameBoard={gameBoard} />

        <ResetButton reset={this.resetGame} winner={winner}/>
      </div>
    )
  }
}

export default connect(state => ({
  player: state.game.player,
  winner: state.game.winner,
  gameBoard: state.game.gameBoard,
  minPlayer: state.game.minPlayer,
  maxPlayer: state.game.maxPlayer,
  iterations: state.game.iterations
}))(Game)
