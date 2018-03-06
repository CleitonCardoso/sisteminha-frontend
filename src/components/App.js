import React from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'

import Login from './Login'
import HomeView from './HomeView'

import './App.css'

const cookies = new Cookies()

class App extends React.Component {
  constructor(props) {
    super(props)
    var credentials = cookies.get('credentials')
    this.state = {
      isLogged: !!credentials
    }
  }

  routeToInitialState = () => {
    console.log('redirect')
    this.props.history.push('/', { state: {} })
  }

  toLogin = () => {
    this.state.isLogged = true
    this.routeToInitialState()
  }

  logout = () => {
    cookies.remove('credentials')
    this.state.isLogged = false
    this.routeToInitialState()
  }

  render() {
    if (this.state.isLogged) {
      console.log('home')
      return <HomeView logout={this.logout} />
    } else {
      console.log('login')
      return <Login toLogin={this.toLogin} />
    }
  }
}

export default withRouter(App)
