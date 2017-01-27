export const CHOOSE_PLAYER = 'CHOOSE_PLAYER'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const GAME_FINISHED = 'GAME_FINISHED'
export const RESET_GAME = 'RESET_GAME'

export const choosePlayer = player => {
  return {
    type: CHOOSE_PLAYER,
    player
  }
}

export const updateBoard = (position, player) => {
  return {
    type: UPDATE_BOARD,
    position,
    player
  }
}

export const gameFinished = winner => {
  return {
    type: GAME_FINISHED,
    winner
  }
}

export const resetGame = () => {
  return {
    type: RESET_GAME
  }
}

export const isWinner = board => {
  if (!board) {
    return null
  }

  //check rows
  for(let i = 0; i <= 6; i = i + 3) {
    if(board[i] !== ' ' && board[i] === board[i + 1] && board[i + 1] == board[i + 2]) {
      return board[i]
    }
  }

  //check columns
  for(let i = 0; i <= 2 ; i++) {
    if(board[i] !== ' ' && board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
      return board[i]
    }
  }

  //check diagonals
  for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
    if(board[i] !== ' ' && board[i] == board[i + j] && board[i + j] === board[i + 2 * j]) {
      return board[i]
    }
  }

  let availableCells = false
  for (let i = 0; i < 9; i++) {
    if (board[i] === ' ') {
      availableCells = true
    }
  }

  if (!availableCells) {
    return 'draw'
  }

  return null
}
