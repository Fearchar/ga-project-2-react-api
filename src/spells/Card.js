import React from 'react'
import { Link } from 'react-router-dom'
import cardStyle from './cardstyle'



const Card = ({ slug, isOpen, name, desc, img, range, duration, castingTime, level, school, dndClass, toggleDesc}) => {
  const icons = dndClass.split(', ')
  return(
    <div className="card">
      <Link to={`/spells/${slug}`}>
        <div className={`card-header has-background-${cardStyle.schoolColour[school]}`}>
          <div className="card-header-title">
            {name}
            {icons.map(icon =>
              <i key={icon} className={`${cardStyle.icons[icon]}`}></i>
            )}
          </div>
        </div>
      </Link>
      <div className="card-content">
        <div className="content">
          <p>{isOpen ? desc : `${desc.slice(0,150)}...`}</p>
          <button
            className="button"
            onClick={toggleDesc ? () => toggleDesc(isOpen, slug) : null}
          >Expand</button>
          <img src={img} />
          <p>{range}</p>
          <p>{duration}</p>
          <p>{castingTime}</p>
          <p>{level}</p>
          <p>{school}</p>
        </div>
      </div>
    </div>

  )
}

export default Card
