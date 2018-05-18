import React from 'react'
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'

import EvaluationService from '../services/EvaluationService'

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

const evaluationService = new EvaluationService()


export default class EvaluationResponseView extends React.Component {

    state = {
        finished: false,
        stepIndex: 0,
    }

    constructor(props) {
        super(props)
        this.state = {
            evaluation: {
                id: this.props.match.params.id
            }
        }
    }

    componentWillMount = () => {
        evaluationService.getResponse(response => {
            if (response.status == 200) {
                this.setState({
                    evaluationResponse: response.data,
                    stepIndex: 0,
                    questionsSize: response.data.evaluation.questions.length,
                    finished: false
                })
            }
        }, this.state.evaluation)
    }

    handleNext = () => {
        var stepIndex = this.state.stepIndex
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= this.state.questionsSize - 1,
        })
    }

    handlePrev = () => {
        var stepIndex = this.state.stepIndex
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 })
        }
    }

    setAlternativeAsRight = (event, value) => {
        console.log(value)
    }

    render() {
        const { finished, stepIndex } = this.state

        return (
            <Paper zDepth={1} style={paper}>
                {/* <div style={{ maxWidth: 380, maxHeight: 400 }}> */}
                <Stepper activeStep={stepIndex} orientation="vertical">
                    {this.state.evaluationResponse &&
                        this.state.evaluationResponse.evaluation &&
                        this.state.evaluationResponse.evaluation.questions.map((question, index) => (
                            <Step>
                                <StepLabel>{question.title}</StepLabel>
                                <StepContent>
                                    <h3>{question.content}</h3>
                                    <RadioButtonGroup name="alternatives" onChange={this.setAlternativeAsRight.bind(this)} >
                                        {question.alternatives && question.alternatives.map((alternative, index) => (
                                            <RadioButton
                                                value={index}
                                                label={alternative.content}
                                                key={index}
                                                style={{
                                                    marginTop: 20,
                                                    marginBottom: 20
                                                }}
                                            />
                                        ))}
                                    </RadioButtonGroup>
                                    <div style={{ margin: '12px 0' }}>
                                        {index > 0 && (
                                            <FlatButton
                                                label="Anterior"
                                                disabled={stepIndex === 0}
                                                disableTouchRipple={true}
                                                disableFocusRipple={true}
                                                onClick={this.handlePrev}
                                                style={{ marginRight: 12 }}
                                            />
                                        )}
                                        <RaisedButton
                                            label={stepIndex === this.state.questionsSize - 1 ? 'Finalizar' : 'Próxima'}
                                            disableTouchRipple={true}
                                            disableFocusRipple={true}
                                            disabled={false}
                                            primary={true}
                                            onClick={this.handleNext}
                                        />
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                </Stepper>
                {finished && (
                    <p style={{ margin: '20px 0', textAlign: 'center' }}>
                        <a href="#" onClick={(event) => {
                            event.preventDefault()
                            this.setState({ stepIndex: 0, finished: false })
                        }}>Clique aqui</a> se quiser revisar suas respostas.
                    </p>
                )}
                {/* </div> */}
            </Paper>
        )
    }
}


const paper = {
    padding: 10
}