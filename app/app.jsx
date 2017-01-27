import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from 'configure-store'
import 'applicationStyles'
import Game from 'game'

ReactDOM.render(
  <Provider store={configureStore()}>
    <Game/>
  </Provider>,
  document.getElementById('root')
)
