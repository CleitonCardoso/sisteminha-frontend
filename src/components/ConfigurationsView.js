import React from 'react'

import Paper from 'material-ui/Paper'
import { GridList } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'

import IncubatorService from '../services/IncubatorService'

const incubatorService = new IncubatorService()

export default class ConfigurationsView extends React.Component {
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
            <RaisedButton
              label="Editar"
              primary={true}
              onClick={console.log('Editando')}
            />

          </div>
          <hr />
          <h1>Usuários</h1>
          <div>
            A fazer: adicionar uma lista de usuários e botão que abre modal com
            formulário para novo usuário
          </div>

          <h1>Configuração de login</h1>
          <div>A fazer: adicionar formulário de alteração de login e senha</div>
        </Paper>
      </div>
    )
  }
}

const paper = {
  padding: 10
}
