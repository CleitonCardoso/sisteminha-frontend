import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Moment from 'moment'

import EvaluationService from '../services/EvaluationService'
import ConfirmacaoPopup from './ConfirmacaoPopup'
import EvaluationDialog from './EvaluationDialog'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const evaluationService = new EvaluationService()

export default class EvaluationsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      evaluations: []
    }
  }

  addItem = e => {
    e.preventDefault()
    this.refs.evaluationDialog.handleOpen()
    // this.props.history.push('/avaliacao/#')
  }

  viewItem = e => {
    e.preventDefault()
    this.props.history.push('/INCUBATOR/avaliacao/' + this.getSelected().id)
  }

  confirmExclusion = e => {
    e.preventDefault()
    this.refs.confirmation.handleOpen()
  }

  handleSave = (evaluation) => {
    evaluationService.save(response => {
      if (response.status === 200) {
        this.props.history.push('/INCUBATOR/avaliacao/' + response.data.id)
      }
    }, evaluation)
  }

  removeItem = () => {
    evaluationService.remove(response => {
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
    evaluationService.listAll(response => {
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
        <EvaluationDialog ref="evaluationDialog" save={this.handleSave} />
        <ConfirmacaoPopup ref="confirmation" confirm={this.removeItem} />
        <Paper zDepth={1}>
          <div style={buttons}>
            <br />
            <RaisedButton
              label={this.getSelected() ? 'Editar' : 'Nova avaliação'}
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
            <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={true}>
              <TableRow>
                <TableHeaderColumn>Título</TableHeaderColumn>
                <TableHeaderColumn>Data de início</TableHeaderColumn>
                <TableHeaderColumn>Data de finalização</TableHeaderColumn>
                <TableHeaderColumn>Situação</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} deselectOnClickaway={false} displayRowCheckbox={true}>
              {this.state.evaluations && this.state.evaluations.map((evaluation, index) => (
                <TableRow
                  key={index}
                  selected={this.state.selected.indexOf(index) !== -1}>
                  <TableRowColumn>{evaluation.title}</TableRowColumn>
                  <TableRowColumn>
                    {Moment(evaluation.startingDate).format('DD/MM/YYYY')}
                  </TableRowColumn>
                  <TableRowColumn>
                    {Moment(evaluation.endingDate).format('DD/MM/YYYY')}
                  </TableRowColumn>
                  <TableRowColumn>{evaluation.status == 'CLOSED' ? 'Fechada' : 'Em aberto'}</TableRowColumn>
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
