import React from 'react'

import Paper from 'material-ui/Paper'
import { GridList } from 'material-ui/GridList'
import Moment from 'moment'

import TenantService from '../services/TenantService'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const tenantService = new TenantService()

export default class TenantDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tenant: {
        id: this.props.match.params.id
      }
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
  }

  componentWillMount = () => {
    if (this.state.tenant.id) {
      this.loadObjects()
    }
  }

  render() {
    return (
      <div>
        <Paper zDepth={1} style={paper}>
          <GridList cols={2} cellHeight={'auto'}>
            <div>
              <h1>{this.state.tenant.companyName}</h1>
              <h3>{this.state.tenant.companyOwner}</h3>
              <div>Telefone: {this.state.tenant.phone}</div>
              <div></div>
            </div>
            <div>
              <h1>Avaliações</h1>
              <Table
              // onRowSelection={this.handleRowSelection}
              // multiSelectable={false}
              // setSelectedRows={this.state.selected}
              >
                <TableHeader enableSelectAll={true} displaySelectAll={true}>
                  <TableRow>
                    <TableHeaderColumn>Título</TableHeaderColumn>
                    <TableHeaderColumn>Data de finalização</TableHeaderColumn>
                    <TableHeaderColumn>Status de resposta</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} deselectOnClickaway={false}>
                  {this.state.evaluations && this.state.evaluations.map((evaluation, index) => (
                    <TableRow
                      key={index}
                      selected={this.state.selected.indexOf(index) !== -1}
                    >
                      <TableRowColumn>{evaluation.title}</TableRowColumn>
                      <TableRowColumn>
                        {Moment(evaluation.endingDate).format('DD/MM/YYYY')}
                      </TableRowColumn>
                      <TableRowColumn>{evaluation.status}</TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
