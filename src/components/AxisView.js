import React from 'react'

import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { GridList, GridTile } from 'material-ui/GridList'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import QuestionsService from '../services/QuestionsService'

import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'

const questionsService = new QuestionsService()

export default class AxisView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mainQuestion: {
        title: 'Questão'
      },
      questions: []
    }
  }

  handleSave = () => {
    questionsService.save(response => {
      console.log(response.data)
    }, this.props.evaluation)
  }

  render() {
    return (
      <div>
        <GridList cols={2} cellHeight={'auto'}>
          <div>
            <Card style={{ margin: 20 }}>
              <TextField floatingLabelText="Título" />
              <TextField
                multiLine={true}
                fullWidth={true}
                onChange={(event, newValue) =>
                  this.setState({ mainQuestion: { content: newValue } })
                }
                floatingLabelText="Pergunta"
              />
              <Toolbar>
                <ToolbarGroup firstChild={true} />
                <ToolbarGroup>
                  <RaisedButton
                    label="Adicionar"
                    primary={true}
                    onClick={this.handleSave}
                  />
                </ToolbarGroup>
              </Toolbar>
            </Card>
            {this.props.questions &&
              this.props.questions.map((question, index) => (
                <Card style={{ margin: 20 }}>
                  <h1>{question.content} </h1>
                </Card>
              ))}
          </div>
          <div>
            <h1>8 Pontos</h1>
          </div>
        </GridList>
        <br />
      </div>
    )
  }
}
