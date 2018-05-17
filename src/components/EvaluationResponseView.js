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
        evaluationService.listAllForCurrentTenant(response => {
            if (response.status == 200) {
                this.setState({ evaluationResponse: response.data })
            }
        })
    }

    handleNext = () => {
        const { stepIndex } = this.state
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        })
    }

    handlePrev = () => {
        const { stepIndex } = this.state
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 })
        }
    }

    renderStepActions(step) {
        const { stepIndex } = this.state

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finalizar' : 'Próxima'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Anterior"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        )
    }

    render() {
        const { finished, stepIndex } = this.state

        return (
            <Paper zDepth={1} style={paper}>
                {/* <div style={{ maxWidth: 380, maxHeight: 400 }}> */}
                <Stepper activeStep={stepIndex} orientation="vertical">
                    {this.state.evaluationResponse && this.state.evaluationResponse.evaluation.map((question, index) => (
                        <Step>
                            <StepLabel>{question.title}</StepLabel>
                            <StepLabel>{question.content}</StepLabel>
                            <StepContent>
                                <RadioButtonGroup name="alternatives" onChange={true}>
                                    {question.alternatives && question.alternatives.map((alternative, index) => (
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
                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {finished && (
                    <p style={{ margin: '20px 0', textAlign: 'center' }}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault()
                                this.setState({ stepIndex: 0, finished: false })
                            }}
                        >
                            Click here
            </a> to reset the example.
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