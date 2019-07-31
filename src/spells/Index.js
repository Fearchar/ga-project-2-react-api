import React from 'react'
import axios from 'axios'


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
    console.log(this.state)
    return (
      null
    )
  }



}



export default SpellsIndex
