import React from 'react'

const Modal = ({ desc, isActive, toggleModal }) => {

  return(
    <div className= {`modal ${isActive}`}>
      <div className="modal-background" onClick={toggleModal}></div>
      <div className="modal-content">
        <div className="box">
          {desc}
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  )
}

export default Modal
