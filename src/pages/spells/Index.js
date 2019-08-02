import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import _ from 'lodash'

import Card from '../../common/Card'
import Modal from '../../common/Modal'
import descriptions from '../../common/descriptions'

class SpellsIndex extends React.Component {
  constructor(){
    super()
    this.state = {
      spells: {},
      openDescs: [],
      formData: {},
      modalActive: '',
      modalDesc: ''
    }

    this.storeFilter = this.storeFilter.bind(this)
    this.toggleDesc = this.toggleDesc.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
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

  storeFilter(e) {
     this.setState({formData:{ ...this.state.formData, [e.target.name]: e.target.value }})
  }

  filterCards() {
    const formData = this.state.formData
    const re = new RegExp(formData.search, 'i')
    const filterCards = _.filter(this.state.spells, card => {
      return (
        (!formData.level || card.level === formData.level) &&
        (!formData.class || card.dnd_class.includes(formData.class)) &&
        (!formData.school || card.school === formData.school) &&
        (re.test(card.name) || re.test(card.school) || re.test(card.dnd_class))
      )
    })
    // const sortedCards = _.orderBy(filterCards, [field], [order])
    return filterCards
  }

  toggleDesc(isOpen, spellSlug) {
    if (!isOpen) {
      this.setState({ openDescs: [...this.state.openDescs, spellSlug] })
    } else {
      const toRemove = this.state.openDescs.indexOf(spellSlug)
      const slice1 = _.slice(this.state.openDescs, [0], [toRemove])
      const slice2 = _.slice(this.state.openDescs, [toRemove + 1])
      this.setState({ openDescs: [...slice1, ...slice2] })
    }
  }

  toggleModal(identify) {
    const desc = descriptions.classes[identify] || descriptions.schools[identify]
    if (!this.state.modalActive) {
      this.setState({modalActive: 'is-active', modalDesc: desc})
    } else {
      this.setState({modalActive: ''})
    }
  }

  render() {
    if (!this.state.spells) return null
    return (
      <section className="section">
      <Modal
        desc={this.state.modalDesc} isActive={this.state.modalActive}
        toggleModal={this.toggleModal}
      />
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="field">
                <input name="search" placeholder="search" className="input" onChange={this.storeFilter}/>
              </div>
            </div>
          </div>
        <div className="columns">
          <div className="column is-one-third-tablet is-one-third-desktop">
            <div className="field">
              <div className="select is-fullwidth">
                <select name="level" onChange={this.storeFilter}>
                  <option value="">All-levels</option>
                  <option value="Cantrip">Cantrip</option>
                  <option value="1st-level">1st-Level</option>
                  <option value="2nd-level">2nd-Level</option>
                  <option value="3rd-level">3rd-Level</option>
                  <option value="4th-level">4th-Level</option>
                  <option value="5th-level">5th-Level</option>
                  <option value="6th-level">6th-Level</option>
                  <option value="7th-level">7th-Level</option>
                  <option value="8th-level">8th-Level</option>
                  <option value="9th-level">9th-Level</option>
                </select>
              </div>
            </div>
          </div>

          <div className="column is-one-third-tablet is-one-third-desktop">
            <div className="field">
              <div className="select is-fullwidth">
                <select name="class" onChange={this.storeFilter}>
                  <option value="">All-Classes</option>
                  <option value="Bard">Bard</option>
                  <option value="Cleric">Cleric</option>
                  <option value="Druid">Druid</option>
                  <option value="Paladin">Paladin</option>
                  <option value="Ranger">Ranger</option>
                  <option value="Sorcerer">Sorcerer</option>
                  <option value="Warlock">Warlock</option>
                  <option value="Wizard">Wizard</option>
                </select>
              </div>
            </div>
          </div>

          <div className="column is-one-third-tablet is-one-third-desktop">
            <div className="field">
              <div className="select is-fullwidth">
                <select name="school" onChange={this.storeFilter}>
                  <option value="">All-Schools</option>
                  <option value="Abjuration">Abjuration</option>
                  <option value="Conjuration">Conjuration</option>
                  <option value="Divination">Divination</option>
                  <option value="Enchantment">Enchantment</option>
                  <option value="Evocation">Evocation</option>
                  <option value="Illusion">Illusion</option>
                  <option value="Necromancy">Necromancy</option>
                  <option value="Transmutaion">Transmutaion</option>
                </select>
              </div>
            </div>
          </div>
        </div>
          <div className="columns is-multiline">
            {_.map(this.filterCards(), (spell) =>
              <div className="column is-one-third-tablet is-one-third-desktop" key={spell.slug}>
                <Card
                  slug={spell.slug}
                  isOpen={this.state.openDescs.includes(spell.slug)}
                  name={spell.name}
                  desc={spell.desc}
                  range={spell.range}
                  duration={spell.duration}
                  castingTime={spell.casting_time}
                  level={spell.level}
                  school={spell.school}
                  dndClass={spell.dnd_class}
                  toggleDesc={this.toggleDesc}
                  toggleModal={this.toggleModal}
                />
              </div>
            )}
          </div>
        </div>
      </section>

    )
  }
}

export default SpellsIndex
