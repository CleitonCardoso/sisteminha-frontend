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

import TenantService from '../services/TenantService'

import EmpresasBox from './EmpresasBox'

const tenantService = new TenantService()

export default class EmpresasView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tenants: []
    }
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

  componentDidMount = () => {
    this.reloadGrid()
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
          <GridList cols={4} cellHeight={'auto'}>
            {this.state.tenants.map(tenant => <EmpresasBox tenant={tenant} />)}
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
