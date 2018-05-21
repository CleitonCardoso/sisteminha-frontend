import React from 'react'

import TextField from 'material-ui/TextField'
import { Card } from 'material-ui/Card'
import { GridList } from 'material-ui/GridList'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

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
        axis: this.props.type,
        alternatives: []
      },
      questions: []
    }
  }

  handleSave = () => {
    if (
      this.state.mainQuestion.title === undefined ||
      this.state.mainQuestion.content === undefined ||
      this.state.mainQuestion.alternatives.length === 0 ||
      this.getSelectedValue(this.state.mainQuestion) === undefined
    ) {
      this.refs.modal.handleOpen()
    } else {
      questionsService.save(
        response => {
          this.setState({
            mainQuestion: {
              axis: this.props.type,
              title: '',
              content: '',
              alternatives: []
            },
            questions: []
          })
          console.log(this.state.mainQuestion)
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

  addAlternative = (event) => {
    if (event.key === 'Enter') {
      var mainQuestion = this.state.mainQuestion;
      mainQuestion.alternatives.push({ content: mainQuestion.alternative, rightAnswer: false });
      mainQuestion.alternative = '';
      this.setState({
        mainQuestion: mainQuestion
      })
    }
  }

  setAlternativeAsRight = (event, value) => {
    var mainQuestion = this.state.mainQuestion;
    var alternative = mainQuestion.alternatives[value];

    alternative.rightAnswer = true;
    mainQuestion.alternatives[value] = alternative;

    this.setState({
      mainQuestion: mainQuestion
    })
  }

  getSelectedValue = (question) => {
    var alternatives = question.alternatives;
    for (var i = 0; i < alternatives.length; i++) {
      if (alternatives[i].rightAnswer)
        return i;
    }
    return undefined;
  }

  render() {
    return (
      <div>
        <Modal
          ref="modal"
          title={'Preencha Titulo, Conteúdo, Alternativas e marque uma alternativa como correta.'}
          actions={
            <FlatButton label="Ok" primary={true} onClick={this.closeModal} />
          }
        />
        <GridList cols={2} cellHeight={'auto'}>
          <div>
            <Card style={{ margin: 20, padding: 10 }}>
              <TextField
                ref="title"
                floatingLabelText="Indicador"
                value={this.state.mainQuestion.title}
                onChange={this.handleFieldChange.bind(this, 'title')}
              />
              <TextField
                ref="content"
                multiLine={true}
                fullWidth={true}
                value={this.state.mainQuestion.content}
                onChange={this.handleFieldChange.bind(this, 'content')}
                floatingLabelText="Pergunta"
              />
              <br />
              <br />
              <br />
              <TextField
                ref="alternative"
                value={this.state.mainQuestion.alternative}
                fullWidth={true}
                onChange={this.handleFieldChange.bind(this, 'alternative')}
                floatingLabelText="Alternativa (Selecione a alternativa correta)"
                onKeyPress={this.addAlternative.bind(this)}
              />
              <br />
              <br />
              <RadioButtonGroup name="alternatives" onChange={this.setAlternativeAsRight.bind(this)}>
                {this.state.mainQuestion.alternatives && this.state.mainQuestion.alternatives.map((alternative, index) => (
                  <RadioButton
                    value={index}
                    label={alternative.content}
                    key={index}
                    style={{
                      block: {
                        maxWidth: 250,
                      },
                      radioButton: {
                        marginBottom: 16,
                      },
                    }}
                  />
                ))}
              </RadioButtonGroup>
              <br />
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
                    style={{ float: 'right' }}>
                    <MenuItem value="1" primaryText="Excluir" onClick={this.delete.bind(this, question)}
                    />
                  </IconMenu>
                  <h1>{question.title} </h1>
                  <p>{question.content} </p>
                  <RadioButtonGroup name="alternatives" valueSelected={this.getSelectedValue(question)}>
                    {question.alternatives && question.alternatives.map((alternative, index) => (
                      <RadioButton
                        value={index}
                        label={alternative.content}
                        disabled={true}
                        key={index}
                        style={{
                          block: {
                            maxWidth: 250,
                          },
                          radioButton: {
                            marginBottom: 16,
                          },
                        }}
                      />
                    ))}
                  </RadioButtonGroup>
                </Card>
              ))}
          </div>
          <div>
           
          </div>
        </GridList>
        <br />
      </div>
    )
  }
}
