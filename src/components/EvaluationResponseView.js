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
import { GridList } from 'material-ui/GridList'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import EvaluationService from '../services/EvaluationService'


const evaluationService = new EvaluationService()

const data = [
    { axis: 'Empreendedor', value: 5, fullMark: 10 },
    { axis: 'Tecnologia', value: 8, fullMark: 10 },
    { axis: 'Mercado', value: 5, fullMark: 10 },
    { axis: 'Capital', value: 2, fullMark: 10 },
    { axis: 'Gestão', value: 3, fullMark: 10 },
]


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
        evaluationService.get
    }

    saveResponse = () => {
        evaluationService.saveResponse(response => {
            if (response.status === 200) {
                this.handleNext()
            }
        }, this.state.evaluationResponse)
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

    setAlternativeAsRight = (question, event, alternative) => {
        var evaluationResponse = this.state.evaluationResponse;
        var selectedAnswer = this.getSelectedValue(undefined, question);
        if (selectedAnswer) {
            evaluationResponse.answers.pop(this.getSelectedValue(undefined, question))
        }
        evaluationResponse.answers.push({
            question: {
                id: question.id,
            },
            alternative: alternative
        })
        this.setState({
            evaluationResponse: evaluationResponse
        })
    }

    getEvaluationPreview = () => {

        var mediums = {
            ENTREPRENEUR: 0, TECHNOLOGY: 0, MARKET: 0, CAPITAL: 0, MANAGEMENT: 0
        }
        // this.state.evaluationResponse.evaluation.questions.forEach(question => {

        // })

        // if (this.state.evaluation.questions) {
        //     return this.state.evaluation.questions.filter(question => {
        //         return question.axis === axisType
        //     })
        // }

        const medium = (data) => {
            var media = 0
            data.forEach(element => {
                media += element.value
            })
            return media / data.length
        }


    }

    getSelectedValue = (event, question) => {
        var answers = this.state.evaluationResponse.answers
        if (answers) {
            var answer = answers.filter(answer => {
                return answer.question.id === question.id
            })[0]
            if (answer) {
                return answer.alternative
            }

        }
        return undefined
    }



    render() {
        const { finished, stepIndex } = this.state


        if (this.state.evaluationResponse &&
            this.state.evaluationResponse.evaluation &&
            this.state.evaluationResponse.evaluation.questions.length > 0) {
            return <Paper zDepth={1} style={paper}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    {this.state.evaluationResponse.evaluation.questions.map((question, index) => (
                        <Step key={index}>
                            <StepLabel>{question.title}</StepLabel>
                            <StepContent>
                                <h3>{question.content}</h3>
                                <RadioButtonGroup name="alternatives"
                                    onChange={this.setAlternativeAsRight.bind(this, question)}
                                    valueSelected={this.getSelectedValue(this, question)}>
                                    {question.alternatives && question.alternatives.map((alternative, index) => (
                                        <RadioButton
                                            value={alternative}
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
                                        onClick={stepIndex === this.state.questionsSize - 1 ? this.saveResponse : this.handleNext}
                                    />
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {finished && (
                    <p style={{ margin: '20px 0', textAlign: 'center' }}>
                        <GridList cols={2} cellHeight={'auto'} style={{ textAlign: 'center', margin: 'auto' }}>
                            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="axis" />
                                <PolarRadiusAxis />
                                <Radar name="evaluationResults" dataKey="value" stroke="#00BCD4" fill="#00BCD4" fillOpacity={0.6} />
                            </RadarChart>
                            <h1 style={{ position: 'relative', top: '50%' }}>Média Geral: {this.medium()}</h1>
                        </GridList>
                        <a href="#" onClick={(event) => {
                            event.preventDefault()
                            this.setState({ stepIndex: 0, finished: false })
                        }}>Clique aqui</a> se quiser responder novamente.
                    </p>
                )}
            </Paper>
        } else {
            return <Paper zDepth={1} style={paper}>
                Nenhuma questão ainda, por favor, informe a incubadora do problema.
            </Paper>
        }
    }
}

const paper = {
    padding: 10
}
