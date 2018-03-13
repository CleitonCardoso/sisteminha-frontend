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

const avaliacoesService = new AvaliacoesService()
const questionsService = new QuestionsService()

export default class AvaliacaoDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  loadObjects = () => {
    questionsService.listAll(
      response => {
        if (response.status === 200) {
          this.setState({
            evaluation: {
              questions: response.data
            }
          })
          console.log(this.state)
        }
      },
      { id: this.props.match.params.id }
    )
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
    return (
      <div>
        <Paper zDepth={1} style={{ margin: '20 20 20 20' }}>
          {this.state && (
            <Tabs>
              <Tab label="Empreendedor">
                <AxisView
                  questions={this.getQuestions('ENTREPRENEUR')}
                  evaluation={this.state.evaluation}
                />
              </Tab>
              <Tab label="Tecnologia">
                <AxisView
                  questions={this.getQuestions('TECHNOLOGY')}
                  evaluation={this.state.evaluation}
                />
              </Tab>
              <Tab label="Mercado">
                <AxisView
                  questions={this.getQuestions('MARKET')}
                  evaluation={this.state.evaluation}
                />
              </Tab>
              <Tab label="Capital">
                <AxisView
                  questions={this.getQuestions('CAPITAL')}
                  evaluation={this.state.evaluation}
                />
              </Tab>
              <Tab label="Gestão">
                <AxisView
                  questions={this.getQuestions('MANAGEMENT')}
                  evaluation={this.state.evaluation}
                />
              </Tab>
            </Tabs>
          )}
        </Paper>
      </div>
    )
  }
}
