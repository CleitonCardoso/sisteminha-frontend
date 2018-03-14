import React from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'

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
    this.props.history.push('/', { state: {} })
  }

  toLogin = () => {
    this.state.isLogged = true
    this.routeToInitialState()
  }

  logout = () => {
    var credentials = cookies.get('credentials')
    let data =
      'username=' + credentials.username + '&password=' + credentials.password

    axios({
      method: 'post',
      url: 'http://localhost:8080/logout',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        console.log(res)
        cookies.remove('credentials')
        this.state.isLogged = false
        this.routeToInitialState()
      })
      .catch(error => {
        console.log(error)
      })
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
