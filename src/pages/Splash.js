import React from 'react'
import { Link } from 'react-router-dom'

const Splash = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-1">D&D Spellbook</h1>
        <h2 className="subtitle is-3"><img src="https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif" /></h2>
        <Link to="/spells"><button className="button is-large is-fullwidth">Hail and Well Met Traveller!</button></Link>
      </div>
    </section>
  )
}

export default Splash
