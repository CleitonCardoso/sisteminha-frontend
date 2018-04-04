import React from 'react'

import Paper from 'material-ui/Paper'
import { GridList } from 'material-ui/GridList'

export default class ConfigurationsView extends React.Component {
  render() {
    return (
      <div>
        <Paper zDepth={1} style={paper}>
          <h1>Detalhes da incubadora</h1>
          <div>
            A fazer: adicionar detalhes como Nome, Responsável, Telefone e email;
          </div>

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
