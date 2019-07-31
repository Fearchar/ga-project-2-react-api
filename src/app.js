import React from 'react'
import ReactDOM from 'react-dom'

import SpellsIndex from './spells/Index'

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <SpellsIndex />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
