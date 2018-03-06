import React from 'react'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { GridList, GridTile } from 'material-ui/GridList'

export default class EmpresaDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {}

  // projeto, implantação, crescimento, consolidação e gradução

  render() {
    return (
      <div>
        <Paper zDepth={1}>
          <GridList cols={2} cellHeight={'auto'} />
        </Paper>
      </div>
    )
  }
}
