import React from 'react'
import Card from './Card'

class SpellShow extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({ spell: JSON.parse(localStorage.getItem('spells'))[this.props.match.params.i]})

  }

  render() {
    if(!this.state.spell) return null
    console.log(this.state)
    return (
      <Card
        name={this.state.spell.name}
        desc={this.state.spell.desc}
        range={this.state.spell.range}
        duration={this.state.spell.duration}
        castingTime={this.state.spell.casting_time}
        level={this.state.spell.level}
        school={this.state.spell.school}
        dndClass={this.state.spell.dnd_class}
      />
    )
  }
}

export default SpellShow
