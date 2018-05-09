import React from 'react'

import Paper from 'material-ui/Paper'
import { GridList } from 'material-ui/GridList'
import Moment from 'moment'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'

import TenantService from '../services/TenantService'


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import EvaluationService from '../services/EvaluationService'

const tenantService = new TenantService()

const evaluationService = new EvaluationService()

export default class TenantDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tenant: {
        id: this.props.match.params.id
      },
      allEvaluations: []
    }
  }

  loadObjects = () => {
    tenantService.get(response => {
      if (response.status === 200) {
        this.setState({
          tenant: response.data
        })
      }
    }, this.state.tenant)

    evaluationService.listAll(response => {
      if (response.status === 200) {
        this.setState({
          selected: [],
          allEvaluations: response.data
        })
      }
    })

    evaluationService.listAllForTenant(response => {
      if (response.status === 200) {
        this.setState({
          selected: [],
          evaluations: response.data
        })
      }
    }, this.state.tenant.id)
  }

  includeInEvaluation = (event) => {
    event.preventDefault()
    this.setState({ evaluationsDialog: true });
  }

  componentWillMount = () => {
    if (this.state.tenant.id) {
      this.loadObjects()
    }
  }

  handleRowSelection = (selectedRow) => {
    evaluationService.addTenantInEvaluation(response => {
      if (response.status === 200) {
        this.loadObjects();
        this.setState({ evaluationsDialog: false });
      }
    }, this.state.tenant.id, this.state.allEvaluations[selectedRow])
  }

  handleClose = (event) => {
    this.setState({ evaluationsDialog: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleClose} />
    ];
    return (
      <div>
        <div>
          <Dialog
            title={"Escolha o processo que deseja incluir"}
            actions={actions}
            modal={false}
            open={this.state.evaluationsDialog}
            onRequestClose={this.handleClose}
          >
            <Table onRowSelection={this.handleRowSelection.bind(this)}>
              <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Título</TableHeaderColumn>
                  <TableHeaderColumn>Data de finalização</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody showRowHover={true} deselectOnClickaway={false} displayRowCheckbox={false}>
                {this.state.allEvaluations && this.state.allEvaluations.map((evaluation, index) => (
                  <TableRow key={index} >
                    <TableRowColumn>{evaluation.title}</TableRowColumn>
                    <TableRowColumn>
                      {Moment(evaluation.endingDate).format('DD/MM/YYYY')}
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Dialog>
        </div>



        <Paper zDepth={1} style={paper}>
          <h1 style={{ textAlign: 'center', fontSize: 50 }}>{this.state.tenant.companyName}</h1>
          <GridList cols={2} cellHeight={'auto'}>
            <div>
              <h1 style={{ textAlign: 'center' }}>Avaliações</h1>
              <RaisedButton
                label="Incluir em um processo de avaliação"
                primary
                fullWidth={true}
                onClick={this.includeInEvaluation}
              />
              <Table>
                <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Título</TableHeaderColumn>
                    <TableHeaderColumn>Data de finalização</TableHeaderColumn>
                    <TableHeaderColumn>Status de resposta</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} deselectOnClickaway={false} displayRowCheckbox={false}>
                  {this.state.evaluations && this.state.evaluations.map((evaluation, index) => (
                    <TableRow key={index} >
                      <TableRowColumn>{evaluation.evaluation.title}</TableRowColumn>
                      <TableRowColumn>
                        {Moment(evaluation.evaluation.endingDate).format('DD/MM/YYYY')}
                      </TableRowColumn>
                      <TableRowColumn>{evaluation.finished ? 'Aberta' : 'Pendente'}</TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h1 style={{ textAlign: 'center' }}>Nota Geral:</h1>
              <div>
                <div style={score}>
                  <b>{this.state.tenant.score}</b>
                </div>
              </div>
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

const score = {
  fontSize: 100,
  textAlign: 'center',
  marginTop: 50,
  marginBottom: 100
}