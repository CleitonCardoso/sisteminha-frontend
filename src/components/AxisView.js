import React from 'react'

import TextField from 'material-ui/TextField'
import { Card } from 'material-ui/Card'
import { GridList } from 'material-ui/GridList'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import QuestionsService from '../services/QuestionsService'
import FlatButton from 'material-ui/FlatButton'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import Modal from './Modal'

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'

const questionsService = new QuestionsService()

export default class AxisView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mainQuestion: {
        axis: this.props.type
      },
      questions: []
    }
  }

  handleSave = () => {
    if (
      this.state.mainQuestion.title === undefined ||
      this.state.mainQuestion.content === undefined
    ) {
      this.refs.modal.handleOpen()
    } else {
      questionsService.save(
        response => {
          this.setState({
            mainQuestion: {
              axis: this.props.type
            }
          })
          this.props.success()
        },
        this.props.evaluation,
        this.state.mainQuestion
      )
    }
  }

  delete = (question, event) => {
    questionsService.remove(question, response => {
      this.props.success()
    })
  }

  closeModal = () => {
    this.refs.modal.handleClose()
  }

  handleFieldChange = (field, event) => {
    var mainQuestion = this.state.mainQuestion
    mainQuestion[field] = event.target.value
    this.setState({
      mainQuestion: mainQuestion
    })
  }

  render() {
    return (
      <div>
        <Modal
          ref="modal"
          title={'Preencha os campos corretamente!'}
          actions={
            <FlatButton label="Ok" primary={true} onClick={this.closeModal} />
          }
        />
        <GridList cols={2} cellHeight={'auto'}>
          <div>
            <Card style={{ margin: 20, padding: 10 }}>
              <TextField
                ref="title"
                floatingLabelText="Título"
                onChange={this.handleFieldChange.bind(this, 'title')}
              />
              <TextField
                ref="content"
                multiLine={true}
                fullWidth={true}
                onChange={this.handleFieldChange.bind(this, 'content')}
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
                <Card style={{ margin: 20, padding: 10 }} key={index}>
                  <IconMenu
                    iconButtonElement={
                      <IconButton>
                        <ExpandMore />
                      </IconButton>
                    }
                    onChange={this.handleChangeSingle}
                    value={this.state.valueSingle}
                    style={{ float: 'right' }}
                  >
                    <MenuItem value="1" primaryText="Editar" />
                    <MenuItem
                      value="2"
                      primaryText="Excluir"
                      onClick={this.delete.bind(this, question)}
                    />
                  </IconMenu>
                  <h1>{question.title} </h1>
                  <p>{question.content} </p>
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
