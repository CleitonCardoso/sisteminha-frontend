import React from 'react'
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  lime400,
  green400,
  cyan400,
  blue400,
  red400
} from 'material-ui/styles/colors'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

export default class EmpresasBox extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
  }

  state = {
    open: false,
    phases: {
      PROJECT: lime400,
      IMPLANTATION: green400,
      GROWING: cyan400,
      CONSOLIDATION: blue400,
      GRADUATION: red400
    }
  }

  // projeto, implantação, crescimento, consolidação e gradução

  render() {
    return (
      <div>
        <Card
          style={{
            backgroundColor: this.state.phases[this.props.tenant.maturityLevel]
          }}
        >
          <CardHeader
            title={this.props.tenant.companyName}
            subtitle={this.props.tenant.companyOwner}
          />
          <CardText>DESCRIÇÃO DA FASE</CardText>
          <CardActions>
            <Link to={'/empresas/' + this.props.tenant.id}>
              <RaisedButton label="Visualizar" fullWidth={true} />
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }
}
