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
    // this.state = {
    //   empresa: props.empresa
    // }
  }

  state = {
    open: false,
    empresa: {
      nome: 'Teste',
      responsavel: 'fulano'
    },
    phases: {
      PROJETO: lime400,
      IMPLANTACAO: green400,
      CRESCIMENTO: cyan400,
      CONSOLIDACAO: blue400,
      GRADUACAO: red400
    }
  }

  // projeto, implantação, crescimento, consolidação e gradução

  render() {
    return (
      <div>
        <Card
          style={{
            backgroundColor: this.state.phases[this.props.empresa.fase]
          }}
        >
          <CardHeader
            title={this.props.empresa.nome}
            subtitle={this.props.empresa.responsavel}
          />
          <CardText>DESCRIÇÃO DA FASE</CardText>
          <CardActions>
            <Link to={'/empresas/' + this.props.empresa.id}>
              <RaisedButton label="Visualizar" fullWidth={true} />
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }
}
