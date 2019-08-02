import React from 'react'
import Card from '../../common/Card'

import GoogleImages from 'google-images'

import Modal from '../../common/Modal'
import descriptions from '../../common/descriptions'

class SpellShow extends React.Component {
  constructor() {
    super()
    this.state = {
      img: '',
      modalActive: '',
      modalDesc: ''
    }
    this.getImage = this.getImage.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  componentDidMount() {
    const spells = JSON.parse(localStorage.getItem('spells'))
    const spell = spells.find(spell => spell.slug === this.props.match.params.slug)
    console.log(this.props.match.params.slug)
    this.setState({ spell }, () => {
      this.getImage()
    })
  }

  getImage() {
    console.log(process.env.GOOGLE_API_KEY)
    const client = new GoogleImages('004991023930242296851:9-esw8ey0xs', process.env.GOOGLE_API_KEY)
    client.search(`illustration ${this.state.spell.name}`)
      .then(images => this.setState({ img: images[0].url }))
      // .catch(err => console.log(err))
  }

  toggleModal(identify) {
    const desc = descriptions.classes[identify] || descriptions.schools[identify]
    if (!this.state.modalActive) {
      this.setState({modalActive: 'is-active', modalDesc: desc})
    } else {
      this.setState({modalActive: ''})
    }
  }



  goTo(location) {
    this.props.history.push(`/${location}`)
  }

  render() {
    // console.log(this.state.img)
    if(!this.state.spell) return null
    return (
      <section className="section">
        <Modal
          desc={this.state.modalDesc} isActive={this.state.modalActive}
          toggleModal={this.toggleModal}
        />
        <button className="button is-primary" onClick={() => this.goTo('spells')}>◀</button>
        <Card
          slug={this.state.spell.slug}
          isOpen={true}
          name={this.state.spell.name}
          img={this.state.img}
          desc={this.state.spell.desc}
          range={this.state.spell.range}
          duration={this.state.spell.duration}
          castingTime={this.state.spell.casting_time}
          level={this.state.spell.level}
          school={this.state.spell.school}
          dndClass={this.state.spell.dnd_class}
          toggleModal={this.toggleModal}
        />
      </section>
    )
  }
}

export default SpellShow
