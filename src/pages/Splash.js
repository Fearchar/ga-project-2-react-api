import React from 'react'
import { Link } from 'react-router-dom'

const Splash = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1 has-text-centered">D&D Spellbook</h1>
        <h2 className="subtitle is-3 has-text-centered"><img src="https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif" /></h2>
        <Link to="/spells">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <button className="button is-large has-text-centered">Hail and Well Met Traveller!</button>
            </div>
          </div>
        </Link>


      </div>
    </section>
  )
}

export default Splash
