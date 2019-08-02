import React from 'react'
import { Link } from 'react-router-dom'
import cardStyle from './cardstyle'



const Card = ({ slug, isOpen, name, desc, img, range, duration, castingTime, level, school, dndClass, toggleDesc, toggleModal}) => {
  const icons = dndClass.split(', ')
  return(
    <div className="card">
      <div className={`has-text-white stroke card-header has-background-${cardStyle.schoolColour[school]}`}>
        <div className="hero card-header-title">
          <div className="level">
            <div className="level-left">
              <Link to={`/spells/${slug}`}>
                <div className="level-item">
                  {name}
                </div>
              </Link>
            </div>
            <div className="level-right">
              <div className="level-item">
                {icons.map(icon =>
                  <i
                    key={icon}
                    className={`${cardStyle.icons[icon]}`}
                    onClick={() => toggleModal(icon)}
                  ></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="content">
          <div className="columns">
            {img ? <div className="column">
              <figure className="image is-512x512">
                <img src={img} />
              </figure>
            </div> : null}

            <div className="column">
              <div className="has-text-justified">
                <p onClick={toggleDesc ? () => toggleDesc(isOpen, slug) : null}>{isOpen ? desc : `${desc.slice(0,150)}...`}</p>
              </div>
            </div>
          </div>

          <div className="columns is-half-tablet is-half-desktop">
            <div className="column">
              <p>{`Range: ${range}`}</p>
              <p>{`Duration: ${duration}`}</p>
              <p onClick={() => toggleModal(school)}>{school}</p>
            </div>

            <div className="column">
              <p>{`Casting time ${range}`}</p>
              <p>{`Level: ${level}`}</p>
              <p>{`Casting time: ${castingTime}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>







  )
}

export default Card
