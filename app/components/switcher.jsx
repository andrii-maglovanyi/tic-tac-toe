import React from 'react'

const ResetButton = ({on, onClick}) => (
  <div className="switcher">
    <div className={on ? 'switcher__main switcher__main--on' : 'switcher__main'} onClick={onClick}>
      <div className={on ? 'switcher__toggle switcher__toggle--on' : 'switcher__toggle'}>
        <div className={on ? 'icon icon-o' : 'icon icon-x'}></div>
      </div>
    </div>
  </div>
)

ResetButton.propTypes = {
  on: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default ResetButton
