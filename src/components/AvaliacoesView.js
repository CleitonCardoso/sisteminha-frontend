import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import axios from 'axios'
import Moment from 'moment'
import Cookies from 'universal-cookie'

import ConfirmacaoPopup from './ConfirmacaoPopup'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

export default class AvaliacoesView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      avaliacoes: [{ detalhe: 'Ciclo 1', data: 'Fev', status: 'Finalizada' }]
    }
  }

  addItem = e => {
    e.preventDefault()
    this.refs.modal.handleOpen(this.getSelected(), this.state.credentials)
  }

  removeItem = e => {
    e.preventDefault()
    this.refs.confirmation.handleOpen()
  }

  handleRowSelection = selectedRows => {
    if (selectedRows === 'none') {
      selectedRows = []
    }
    this.setState({
      selected: selectedRows
    })
  }

  getSelected = () => {
    return this.state.avaliacoes[this.state.selected]
  }

  render() {
    return (
      <div>
        <ConfirmacaoPopup ref="confirmation"/>
        <Paper zDepth={1}>
          <div style={buttons}>
            <br />
            <RaisedButton
              label={this.state.selected.length === 0 ? 'Adicionar' : 'Editar'}
              primary
              style={btn}
              onClick={this.addItem}
              disabled={this.state.selected.length > 1}
            />
            <RaisedButton
              label="Remover"
              secondary
              style={btn}
              disabled={this.state.selected.length === 0}
              onClick={this.removeItem}
            />
            <br />
          </div>
          <Table
            onRowSelection={this.handleRowSelection}
            multiSelectable={false}
            setSelectedRows={this.state.selected}
          >
            <TableHeader enableSelectAll={true} displaySelectAll={true}>
              <TableRow>
                <TableHeaderColumn>Detalhe</TableHeaderColumn>
                <TableHeaderColumn>Mês</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} deselectOnClickaway={false}>
              {this.state.avaliacoes.map((avaliacao, index) => (
                <TableRow
                  key={index}
                  selected={this.state.selected.indexOf(index) !== -1}
                >
                  <TableRowColumn>{avaliacao.detalhe}</TableRowColumn>
                  <TableRowColumn>{avaliacao.data}</TableRowColumn>
                  <TableRowColumn>{avaliacao.status}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
