import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ slug, isOpen, name, img, desc, range, duration, castingTime, level, school, dndClass, toggleDesc}) => {
  return(
    <div className="card">
      <Link to={`/spells/${slug}`}>
        <div className="card-header">
          <div className="card-header-title">{name}</div>
        </div>
      </Link>
      <div className="card-content">
        <div className="content">
          <p
            onClick={toggleDesc ? () => toggleDesc(isOpen, slug) : null}
          >{isOpen ? desc : `${desc.slice(0,150)}...`}</p>
          <img src={img} />
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
