import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'

import AxisView from './AxisView'

import AvaliacoesService from '../services/AvaliacoesService'
import QuestionsService from '../services/QuestionsService'
import DatePicker from 'material-ui/DatePicker'

import Moment from 'moment'

import {
  cyan400,
  cyan500,
  cyan600,
  cyan700,
  cyan800
} from 'material-ui/styles/colors'

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

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
    avaliacoesService.get(response => {
      if (response.status === 200) {
        this.setState({
          evaluation: response.data
        })
        questionsService.listAll(response => {
          if (response.status === 200) {
            var evaluation = this.state.evaluation
            evaluation.questions = response.data
            this.setState({
              evaluation: evaluation
            })
            this.forceUpdate()
          }
        }, this.state.evaluation)
      }
    }, this.state.evaluation)
  }

  componentWillMount = () => {
    if (this.state.evaluation.id) {
      this.loadObjects()
    }
  }

  handleStartingDate = (event, date) => {
    var evaluation = this.state.evaluation
    evaluation.startingDate = date
    this.state({
      evaluation: evaluation
    })
  }

  handleEndingDate = (event, date) => {
    var evaluation = this.state.evaluation
    evaluation.endingDate = date
    this.setState({
      evaluation: evaluation
    })
  }

  handleTitle = (event, value) => {
    var evaluation = this.state.evaluation
    evaluation.title = value
    this.setState({
      evaluation: evaluation
    })
  }

  handleSave = () => {
    console.log(this.state.evaluation)
    avaliacoesService.save(response => {
      if (response.status === 200) {
        this.props.history.push('/avaliacoes')
      }
    }, this.state.evaluation)
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
        <Paper zDepth={1} style={{ padding: 20 }}>
          <Paper zDepth={2} style={{ padding: 10 }}>
            <h1>
              {this.state.evaluation.id ? 'Editando' : 'Nova Avaliação'}
            </h1>
            <TextField
              floatingLabelText="Título da avaliação"
              value={
                this.state.evaluation.title ? this.state.evaluation.title : ''
              }
              onChange={this.handleTitle.bind(this)}
            />
            <DatePicker
              hintText="Data de início"
              value={
                this.state.evaluation.startingDate
                  ? new Date(
                      Moment(this.state.evaluation.startingDate).format(
                        'YYYY/MM/DD'
                      )
                    )
                  : null
              }
              onChange={this.handleStartingDate}
            />
            <DatePicker
              hintText="Data de finalização"
              value={
                this.state.evaluation.endingDate
                  ? new Date(
                      Moment(this.state.evaluation.endingDate).format(
                        'YYYY/MM/DD'
                      )
                    )
                  : null
              }
              onChange={this.handleEndingDate}
            />
          </Paper>
          <br />
          <Paper zDepth={2}>
            {this.state && (
              <Tabs inkBarStyle={styles.INK_BAR}>
                <Tab label="Empreendedor" style={styles.ENTREPRENEUR}>
                  <AxisView
                    questions={this.getQuestions('ENTREPRENEUR')}
                    type="ENTREPRENEUR"
                    evaluation={this.state.evaluation}
                    success={this.loadObjects}
                  />
                </Tab>
                <Tab label="Tecnologia" style={styles.TECHNOLOGY}>
                  <AxisView
                    questions={this.getQuestions('TECHNOLOGY')}
                    type="TECHNOLOGY"
                    evaluation={this.state.evaluation}
                    success={this.loadObjects}
                  />
                </Tab>
                <Tab label="Mercado" style={styles.MARKET}>
                  <AxisView
                    questions={this.getQuestions('MARKET')}
                    type="MARKET"
                    evaluation={this.state.evaluation}
                    success={this.loadObjects}
                  />
                </Tab>
                <Tab label="Capital" style={styles.CAPITAL}>
                  <AxisView
                    questions={this.getQuestions('CAPITAL')}
                    type="CAPITAL"
                    evaluation={this.state.evaluation}
                    success={this.loadObjects}
                  />
                </Tab>
                <Tab label="Gestão" style={styles.MANAGEMENT}>
                  <AxisView
                    questions={this.getQuestions('MANAGEMENT')}
                    type="MANAGEMENT"
                    evaluation={this.state.evaluation}
                    success={this.loadObjects}
                  />
                </Tab>
              </Tabs>
            )}
          </Paper>
        </Paper>
        <Toolbar>
          <ToolbarGroup firstChild={true} />
          <ToolbarGroup>
            <RaisedButton
              label="Salvar"
              primary={true}
              onClick={this.handleSave}
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}
