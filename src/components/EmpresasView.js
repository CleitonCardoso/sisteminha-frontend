import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Paper from 'material-ui/Paper'

import EmpresasBox from './EmpresasBox'

const styles = {
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around'
  },
  gridList: {
    // width: 500,
    // height: 450,
    // overflowY: 'auto'
  }
}

const empresasData = [
  {
    id: 1,
    nome: 'Empresa 1 LTDA',
    responsavel: 'Junior',
    fase: 'PROJETO'
  },
  {
    id: 2,
    nome: 'Empresa 2 LTDA',
    responsavel: 'Junior',
    fase: 'IMPLANTACAO'
  },
  {
    id: 3,
    nome: 'Empresa 3 LTDA',
    responsavel: 'Junior',
    fase: 'CRESCIMENTO'
  },
  {
    id: 4,
    nome: 'Empresa 4 LTDA',
    responsavel: 'Junior',
    fase: 'CONSOLIDACAO'
  },
  {
    id: 5,
    nome: 'Empresa 5 LTDA',
    responsavel: 'Junior',
    fase: 'GRADUACAO'
  },
  {
    id: 6,
    nome: 'Empresa 2 LTDA',
    responsavel: 'Junior',
    fase: 'IMPLANTACAO'
  },
  {
    id: 7,
    nome: 'Empresa 3 LTDA',
    responsavel: 'Junior',
    fase: 'CRESCIMENTO'
  },
  {
    id: 8,
    nome: 'Empresa 4 LTDA',
    responsavel: 'Junior',
    fase: 'CONSOLIDACAO'
  },
  {
    id: 9,
    nome: 'Empresa 5 LTDA',
    responsavel: 'Junior',
    fase: 'GRADUACAO'
  },
  {
    id: 10,
    nome: 'Empresa 2 LTDA',
    responsavel: 'Junior',
    fase: 'IMPLANTACAO'
  },
  {
    id: 11,
    nome: 'Empresa 3 LTDA',
    responsavel: 'Junior',
    fase: 'CRESCIMENTO'
  },
  {
    id: 12,
    nome: 'Empresa 4 LTDA',
    responsavel: 'Junior',
    fase: 'CONSOLIDACAO'
  },
  {
    id: 13,
    nome: 'Empresa 5 LTDA',
    responsavel: 'Junior',
    fase: 'GRADUACAO'
  }
]

export default class EmpresasView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Paper zDepth={1}>
          <div style={buttons}>
            <br />
            <RaisedButton
              label="Adicionar"
              primary
              style={btn}
              // onClick={this.addItem}
              // disabled={this.state.selected.length > 1}
            />
            <br />
          </div>
          <GridList cols={4} cellHeight={'auto'} style={styles.gridList}>
            {empresasData.map(empresa => <EmpresasBox empresa={empresa} />)}
          </GridList>
        </Paper>
      </div>
    )
  }
}
const btn = {
  margin: 20
}

const buttons = {
  textAlign: 'left'
}
