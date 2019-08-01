import React from 'react'
import Card from './Card'

class SpellShow extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.setState({ spell: JSON.parse(localStorage.getItem('spells'))[this.props.match.params.i]})
  }

  goTo(location) {
    this.props.history.push(`/${location}`)
  }

  render() {
    if(!this.state.spell) return null
    return (
      <section className="section">
        <button className="button is-primary" onClick={() => this.goTo('spells')}>◀</button>
        <Card
          open={true}
          name={this.state.spell.name}
          desc={this.state.spell.desc}
          range={this.state.spell.range}
          duration={this.state.spell.duration}
          castingTime={this.state.spell.casting_time}
          level={this.state.spell.level}
          school={this.state.spell.school}
          dndClass={this.state.spell.dnd_class}
        />
      </section>
    )
  }
}

export default SpellShow
