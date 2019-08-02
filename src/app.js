import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'

import SpellsIndex from './pages/spells/Index'
import SpellShow from './pages/spells/Show'
import Splash from './pages/Splash'


import 'bulma'
import './style.scss'

class App extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/spells/:slug" component={SpellShow}/>
          <Route path="/spells" component={SpellsIndex} />
          <Route path="/" component={Splash} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
