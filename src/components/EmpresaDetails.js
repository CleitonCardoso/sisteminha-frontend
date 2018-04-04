import React from 'react'

import Paper from 'material-ui/Paper'
import { GridList } from 'material-ui/GridList'

export default class EmpresaDetails extends React.Component {
  render() {
    return (
      <div>
        <Paper zDepth={1} style={paper}>
          <GridList cols={2} cellHeight={'auto'}>
            <div>
              <h1>Ovos do Sítio - granja digital</h1>
              <h3>Sérgião berranteiro</h3>

              <div>adicionar gráfico da ultima avaliação</div>
            </div>
            <div>
              <h1>Lista de avaliações respondidas</h1>
            </div>
          </GridList>
        </Paper>
      </div>
    )
  }
}

const paper = {
  padding: 10
}
