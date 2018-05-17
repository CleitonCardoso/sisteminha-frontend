import React from 'react'

import Paper from 'material-ui/Paper'
import { GridList } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import IncubatorService from '../services/IncubatorService'

import UserListView from './UserListView'

const incubatorService = new IncubatorService()

export default class TenantConfigurationsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      incubator: {
      }
    }
  }

  componentDidMount() {
    incubatorService.get(response => {
      this.setState({
        incubator: response.data
      })
    })
  }


  render() {
    return (
      <div>
        <Paper zDepth={1} style={paper}>
          <h1>Detalhes da incubadora</h1>
          <div>
            <ul>
              <li>Nome: <b>{this.state.incubator.name}</b></li>
              <br />
              <li>Responsável: <b>{this.state.incubator.directorName}</b></li>
              <br />
              <li>Telefone: <b>{this.state.incubator.phone}</b></li>
              <br />
              <li>Email: <b>{this.state.incubator.mail}</b></li>

            </ul>
          </div>
        </Paper>
        <br />
        <Paper zDepth={1} style={paper}>
          <h1>Configuração de login</h1>
          <TextField
            floatingLabelText="Email"
            onChange={this.setValue}
            id="email"
          /><br />
          <TextField
            ref="password"
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
          <FlatButton
            label="Salvar"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleSave} />
        </Paper>
      </div>
    )
  }
}

const paper = {
  padding: 10
}
