import {CHOOSE_PLAYER, UPDATE_BOARD, GAME_FINISHED, RESET_GAME} from 'actions'

const EMPTY_ARRAY = [
  ' ', ' ', ' ',
  ' ', ' ', ' ',
  ' ', ' ', ' '
]

const initalState = {
  gameBoard: EMPTY_ARRAY,
  player: 'x',
  winner: null,
  maxPlayer: 'x',
  minPlayer: 'o'
}

export const gameReducer = (state = initalState, action) => {
  switch (action.type) {
    case CHOOSE_PLAYER:
      return {...state, player: action.player, maxPlayer: action.player, minPlayer: action.player === 'x' ? 'o' : 'x' }
    case UPDATE_BOARD:
      return {...state, gameBoard: state.gameBoard.map((cell, index) =>
        index === action.position && cell === ' ' ? action.player : cell
      ), player: state.player === 'x' ? 'o' : 'x'}
    case GAME_FINISHED:
      return {...state, winner: action.winner}
    case RESET_GAME:
      return initalState
    default:
      return state
  }
}
