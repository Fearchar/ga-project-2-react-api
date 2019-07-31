import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import SpellsIndex from './spells/Index'
import SpellShow from './spells/Show'

import 'bulma'

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/spells/:i" component={SpellShow}/>
          <Route path="/spells" component={SpellsIndex} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
