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

export default class TenantEvaluationsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: [],
      evaluationResponses: []
    }
  }


  viewItem = e => {
    e.preventDefault()
    this.props.history.push('/TENANT/avaliacao/' + this.getSelected().id)
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
    evaluationService.listAllForCurrentTenant(response => {
      if (response.status === 200) {
        this.setState({
          selected: [],
          evaluationResponses: response.data
        })
      }
    })
  }

  componentDidMount() {
    this.reloadList()
  }

  getSelected = () => {
    return this.state.evaluationResponses[this.state.selected]
  }

  render() {
    return (
      <div>
        <Paper zDepth={1}>
          <div style={buttons}>
            <br />
            <RaisedButton
              label={'Responder Avaliação'}
              primary
              style={btn}
              onClick={this.viewItem}
              disabled={this.state.selected.length === 0}
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
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} deselectOnClickaway={false} displayRowCheckbox={true}>
              {this.state.evaluationResponses && this.state.evaluationResponses.map((evaluationResponse, index) => (
                <TableRow
                  key={index}
                  selected={this.state.selected.indexOf(index) !== -1}
                >
                  <TableRowColumn>{evaluationResponse.evaluation.title}</TableRowColumn>
                  <TableRowColumn>
                    {Moment(evaluationResponse.evaluation.startingDate).format('DD/MM/YYYY')}
                  </TableRowColumn>
                  <TableRowColumn>
                    {Moment(evaluationResponse.evaluation.endingDate).format('DD/MM/YYYY')}
                  </TableRowColumn>
                  <TableRowColumn>{evaluationResponse.finished ? 'Finalizada' : 'Pendente'}  </TableRowColumn>
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
