import React from 'react'
import { Link } from 'react-router-dom'
import cardStyle from './cardstyle'



const Card = ({ slug, isOpen, name, desc, img, range, duration, castingTime, level, school, dndClass, toggleDesc}) => {
  const icons = dndClass.split(', ')
  return(
    <div className="card">
      <Link to={`/spells/${slug}`}>
        <div className={`card-header has-background-${cardStyle.schoolColour[school]}`}>
          <div className="hero card-header-title">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  {name}
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  {icons.map(icon =>
                    <i key={icon} className={`${cardStyle.icons[icon]}`}></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="card-content">
        <div className="content">
          <div>
            <p onClick={toggleDesc ? () => toggleDesc(isOpen, slug) : null}>{isOpen ? desc : `${desc.slice(0,150)}...`}</p>
          </div>
          <img src={img} />
          <p>{`Range: ${range}`}</p>
          <p>{`Duration: ${duration}`}</p>
          <p>{`Casting time ${range}`}</p>
          <p>{`Level: ${level}`}</p>
          <p>{`Casting time: ${castingTime}`}</p>
        </div>
      </div>
    </div>

  )
}

export default Card
