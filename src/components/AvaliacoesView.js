import React from 'react'
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

import AvaliacoesService from '../services/AvaliacoesService'
import ConfirmacaoPopup from './ConfirmacaoPopup'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const avaliacoesService = new AvaliacoesService()

export default class AvaliacoesView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      evaluations: []
    }
  }

  addItem = e => {
    e.preventDefault()
    this.props.history.push('/avaliacao/#')
  }

  viewItem = e => {
    e.preventDefault()
    this.props.history.push('/avaliacao/' + this.getSelected().id)
  }

  confirmExclusion = e => {
    e.preventDefault()
    this.refs.confirmation.handleOpen()
  }

  removeItem = () => {
    avaliacoesService.remove(response => {
      if (response.status === 200) {
        this.reloadList()
      }
    }, this.getSelected())
  }

  handleRowSelection = selectedRows => {
    if (selectedRows === 'none') {
      selectedRows = []
    }
    this.setState({
      selected: selectedRows
    })
  }

  reloadList = () => {
    avaliacoesService.listAll(response => {
      if (response.status === 200) {
        this.setState({
          selected: [],
          evaluations: response.data
        })
      }
    })
  }

  componentDidMount() {
    this.reloadList()
  }

  getSelected = () => {
    return this.state.evaluations[this.state.selected]
  }

  render() {
    return (
      <div>
        <ConfirmacaoPopup ref="confirmation" confirm={this.removeItem} />
        <Paper zDepth={1}>
          <div style={buttons}>
            <br />
            <RaisedButton
              label={this.getSelected() ? 'Visualizar' : 'Nova avaliação'}
              primary
              style={btn}
              onClick={this.getSelected() ? this.viewItem : this.addItem}
              disabled={this.state.selected.length > 1}
            />
            <RaisedButton
              label="Excluir"
              secondary
              style={btn}
              disabled={this.state.selected.length === 0}
              onClick={this.confirmExclusion}
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
              {this.state.evaluations.map((evaluation, index) => (
                <TableRow
                  key={index}
                  selected={this.state.selected.indexOf(index) !== -1}
                >
                  <TableRowColumn>{evaluation.title}</TableRowColumn>
                  <TableRowColumn>
                    {Moment(evaluation.startingDate).format('MM/DD/YYYY')}
                  </TableRowColumn>
                  <TableRowColumn>
                    {Moment(evaluation.endingDate).format('MM/DD/YYYY')}
                  </TableRowColumn>
                  <TableRowColumn>{evaluation.status}</TableRowColumn>
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
