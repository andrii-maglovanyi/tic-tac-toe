import {createStore, combineReducers, compose} from 'redux'
import {gameReducer} from 'reducers'

const configureStore = (initialState = {}) => {
  const reducers = combineReducers({
    game: gameReducer
  })

  return createStore(reducers, initialState, compose)
}

export default configureStore
