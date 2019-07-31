import React from 'react'

const Card = ({ i, name, desc, range, duration, castingTime, level, school, dndClass }) => {
  return(
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{name}</div>
      </div>
      <div className="card-content">
        <div className="content">
          <p>{desc}</p>
          <p>{range}</p>
          <p>{duration}</p>
          <p>{castingTime}</p>
          <p>{level}</p>
          <p>{school}</p>
          <p>{dndClass}</p>
        </div>
      </div>
    </div>

  )
}

export default Card
