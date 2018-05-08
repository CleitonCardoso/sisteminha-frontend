import React from 'react'
import { GridList } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import TenantDialog from './TenantDialog'
import TenantService from '../services/TenantService'

import TenantBox from './TenantBox'

const tenantService = new TenantService()

export default class TenantsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tenants: []
    }
  }

  addItem = () => {
    this.refs.myDialog.handleOpen();
  }

  reloadGrid = () => {
    tenantService.listAll(response => {
      if (response.status === 200) {
        this.setState({
          tenants: response.data
        })
      }
    })
  }

  openNewTenant = (tenant) => {
    this.props.history.push('/empresas/' + tenant.id)
  }

  componentDidMount = () => {
    this.reloadGrid()
  }

  render() {
    return (
      <div>
        <TenantDialog ref="myDialog" handler={this.openNewTenant} />
        <Paper zDepth={1}>
          <div style={buttons}>
            <br />
            <RaisedButton
              label="Adicionar"
              primary
              style={btn}
              onClick={this.addItem}
            />
            <br />
          </div>
          <GridList cols={4} cellHeight={'auto'}>
            {this.state.tenants.map(tenant => <TenantBox tenant={tenant} />)}
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
