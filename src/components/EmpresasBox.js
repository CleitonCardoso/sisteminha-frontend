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


const phases = {
  PROJECT: {
    title: 'Projeto',
    color: lime400
  },
  IMPLANTATION: {
    title: 'Implantação',
    color: green400
  },
  GROWING: {
    title: 'Crescimento',
    color: cyan400
  },
  CONSOLIDATION: {
    title: 'Consolidação',
    color: blue400
  },
  GRADUATION: {
    title: 'Graduação',
    color: red400
  }
}

export default class EmpresasBox extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
  }

  state = {
    open: false
  }

  render() {
    return (
      <div>
        <Card
          style={{
            backgroundColor: phases[this.props.tenant.maturityLevel].color,
            margin: 10,
          }}
        >
          <CardHeader
            title={this.props.tenant.companyName}
            subtitle={this.props.tenant.companyOwner}
          />
          <CardText>{phases[this.props.tenant.maturityLevel].title}</CardText>
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
