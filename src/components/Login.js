import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import axios from 'axios'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

import SessionService from '../services/SessionService'

const cookies = new Cookies()

const sessionService = new SessionService()

class Login extends Component {
  constructor(props) {
    super(props)
    var credentials = cookies.get('credentials')

    this.state = {
      isLogged: !!credentials,
      credentials: credentials,
      errorText: ''
    }

    if (this.state.isLogged) {
      this.props.toLogin
    }
  }

  wrongPass = () => {
    this.setState({
      errorText: 'Usuário ou senha inválidos'
    })
  }

  login = () => {
    let data =
      'username=' + this.state.username + '&password=' + this.state.password

    axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        cookies.set(
          'credentials',
          {
            username: this.state.username,
            password: this.state.password
          },
          { path: '/' }
        )
        this.props.toLogin()
      })
      .catch(error => {
        console.log(error)
        this.wrongPass()
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="login">
          <AppBar title="Sisteminha" showMenuIconButton={false} />
          <div style={loginBox}>
            <Paper zDepth={1}>
              <TextField
                ref="user"
                errorText={this.state.errorText}
                hintText="Admin"
                floatingLabelText="Usuário"
                onChange={(event, newValue) =>
                  this.setState({ username: newValue })
                }
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.refs['password'].select()
                  }
                }}
              />
              <br />
              <TextField
                ref="password"
                errorText={this.state.errorText}
                type="password"
                hintText="Admin"
                floatingLabelText="Senha"
                onChange={(event, newValue) =>
                  this.setState({ password: newValue })
                }
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.login()
                  }
                }}
              />
              <br />
              <RaisedButton
                label="Entrar"
                primary={true}
                style={style}
                onClick={this.login}
              />
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

Login.contextTypes = {
  credentials: PropTypes.object
}

const loginBox = {
  width: 500,
  margin: '100px auto'
}

const style = {
  margin: 15
}

export default Login
