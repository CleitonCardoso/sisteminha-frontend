import React from 'react'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { GridList, GridTile } from 'material-ui/GridList'
import { Tabs, Tab } from 'material-ui/Tabs'
import Slider from 'material-ui/Slider'

import AxisView from './AxisView'

import AvaliacoesService from '../services/AvaliacoesService'
import QuestionsService from '../services/QuestionsService'

import {
  cyan50,
  cyan400,
  cyan500,
  cyan600,
  cyan700,
  cyan800
} from 'material-ui/styles/colors'

const avaliacoesService = new AvaliacoesService()
const questionsService = new QuestionsService()

const styles = {
  ENTREPRENEUR: {
    background: cyan400
  },
  TECHNOLOGY: {
    background: cyan500
  },
  MARKET: {
    background: cyan600
  },
  CAPITAL: {
    background: cyan700
  },
  MANAGEMENT: {
    background: cyan800
  },
  INK_BAR: {
    background: 'gray',
    height: '10px',
    marginTop: '-10px'
  }
}

export default class AvaliacaoDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      evaluation: {
        id: this.props.match.params.id
      }
    }
  }

  loadObjects = () => {
    questionsService.listAll(response => {
      if (response.status === 200) {
        this.setState({
          evaluation: {
            id: this.props.match.params.id,
            questions: response.data
          }
        })
        console.log(this.state)
      }
    }, this.state.evaluation)
  }

  componentWillMount = () => {
    this.loadObjects()
  }

  getQuestions = axisType => {
    if (this.state.evaluation.questions) {
      return this.state.evaluation.questions.filter(question => {
        return question.axis === axisType
      })
    }
  }

  render() {
    return <div>
        <Paper zDepth={1} style={{ margin: '20 20 20 20' }}>
          {this.state && <Tabs inkBarStyle={styles.INK_BAR}>
              <Tab label="Empreendedor" style={styles.ENTREPRENEUR}>
                <AxisView questions={this.getQuestions('ENTREPRENEUR')} type="ENTREPRENEUR" evaluation={this.state.evaluation} success={this.loadObjects} />
              </Tab>
              <Tab label="Tecnologia" style={styles.TECHNOLOGY}>
                <AxisView questions={this.getQuestions('TECHNOLOGY')} type="TECHNOLOGY" evaluation={this.state.evaluation} success={this.loadObjects} />
              </Tab>
              <Tab label="Mercado" style={styles.MARKET}>
                <AxisView questions={this.getQuestions('MARKET')} type="MARKET" evaluation={this.state.evaluation} success={this.loadObjects} />
              </Tab>
              <Tab label="Capital" style={styles.CAPITAL}>
                <AxisView questions={this.getQuestions('CAPITAL')} type="CAPITAL" evaluation={this.state.evaluation} success={this.loadObjects} />
              </Tab>
              <Tab label="Gestão" style={styles.MANAGEMENT}>
                <AxisView questions={this.getQuestions('MANAGEMENT')} type="MANAGEMENT" evaluation={this.state.evaluation} success={this.loadObjects} />
              </Tab>
            </Tabs>}
        </Paper>
      </div>
  }
}
