import React from 'react'

const Announcement = (props) => {
  let message = null
  if (props.winner === 'draw') {
    message = <div className="draw">draw!</div>
  } else {
    message = <div className={props.winner === 'o' ? 'announcement__o' :  'announcement__x'}><b>{props.winner}</b> won!</div>
  }

  return (
    <div className={props.winner ? 'announcement--visible': 'announcement--hidden'}>
      {message}
    </div>
  )
}

export default Announcement
