import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import _ from 'lodash'

import Card from './Card'

class SpellsIndex extends React.Component {
  constructor(){
    super()
    this.state = {}
    this.storeSearch = this.storeSearch.bind(this)
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

  storeSearch(e) {
    this.setState({ searchTerm: e.target.value })
  }

  filterCards() {
    const re = new RegExp(this.state.searchTerm, 'i')
    // const [field, order] = this.state.sortTerm.split('|')
    const filterCards = _.filter(this.state.spells, card => {
      return re.test(card.name) || re.test(card.school) || re.test(card.dnd_class)
    })
    // const sortedCards = _.orderBy(filterCards, [field], [order])
    return filterCards
  }

  render() {
    if (!this.state.spells) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="field">
                <input placeholder="search" className="input" onKeyUp={this.storeSearch}/>
              </div>
            </div>
          </div>

          <div className="columns is-multiline">
            {_.map(this.filterCards(), (spell, i) =>
              <div className="column is-half-tablet is-one-quarter-desktop" key={i}>
                <Link to={`/spells/${i}`}>
                  <Card
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
              </div>
            )}
          </div>
        </div>

      </section>

    )
  }



}



export default SpellsIndex
