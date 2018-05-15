import React from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie'
import axios from 'axios'

import Login from './Login'
import HomeView from './HomeView'

import './App.css'

import { API_ROOT } from '../services/api-config'

const serverUrl = API_ROOT

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
    var credentials = cookies.get('credentials')
    this.props.history.push('/' + credentials.role + '/', { state: {} })
  }

  componentWillMount = () => {
    var credentials = cookies.get('credentials')
    if (credentials) {
      this.props.history.push('/' + credentials.role + '/', { state: {} })
    }
  }

  toLogin = () => {
    this.setState({
      isLogged: true
    })
    this.routeToInitialState()
  }

  logout = () => {
    var credentials = cookies.get('credentials')
    let data =
      'username=' + credentials.username + '&password=' + credentials.password

    axios({
      method: 'post',
      url: serverUrl + '/logout',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        cookies.remove('credentials', { path: '/' })
        this.setState({
          isLogged: false
        })
        this.forceUpdate();
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    if (this.state.isLogged) {
      return <HomeView logout={this.logout} />
    } else {
      return <Login toLogin={this.toLogin} />
    }
  }
}

export default withRouter(App)
