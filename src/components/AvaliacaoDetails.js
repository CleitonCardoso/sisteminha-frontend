import React from 'react'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { GridList, GridTile } from 'material-ui/GridList'
import { Tabs, Tab } from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  }
}

export default class AvaliacaoDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {}

  // ENTREPRENEUR, TECHNOLOGY, MARKET, CAPITAL, MANAGEMENT;

  render() {
    return (
      <div>
        <Paper zDepth={1}>
          <Tabs>
            <Tab label="Empreendedor">
              <div>ASDF</div>
            </Tab>
            <Tab label="Tecnologia">
              <div>ASDF</div>
            </Tab>
            <Tab label="Mercado">
              <div>ASDF</div>
            </Tab>
            <Tab label="Capital">
              <div>ASDF</div>
            </Tab>
            <Tab label="Gestão">
              <div>ASDF</div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    )
  }
}
