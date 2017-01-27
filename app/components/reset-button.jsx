import React from 'react'

const ResetButton = (props) => (
  <div className={props.winner ? 'reset-button reset-button__active' : 'reset-button'} onClick={props.reset}>reset</div>
)

ResetButton.propTypes = {
  winner: React.PropTypes.string
}

export default ResetButton
