import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import _ from 'lodash'

import Card from './Card'

class SpellsIndex extends React.Component {
  constructor(){
    super()
    this.state = {}
  }

  getSpells() {
    function makeRequest(url, spells=[]) {
      return axios.get(url)
        .then(res => {
          if(res.data.next) return makeRequest(res.data.next, spells.concat(res.data.results))
          return spells.concat(res.data.results)
        })
    }

    return makeRequest('https://api-beta.open5e.com/spells/')
  }

  componentDidMount(){

    const spells = localStorage.getItem('spells')

    if(spells) return this.setState({ spells: JSON.parse(spells) })

    this.getSpells()
      .then(spells => {
        localStorage.setItem('spells', JSON.stringify(spells))
        this.setState({ spells })
      })

  }

  render() {
    if (!this.state.spells) return null
    return (
      <div>
        {_.map(this.state.spells, (spell, i) =>
          <Link to={`/spells/${i}`}>
            <Card
              key={i}
              name={spell.name}
              desc={spell.desc}
              range={spell.range}
              duration={spell.duration}
              castingTime={spell.casting_time}
              level={spell.level}
              school={spell.school}
              dndClass={spell.dnd_class}
            />
          </Link>
        )}
      </div>
    )
  }



}



export default SpellsIndex
