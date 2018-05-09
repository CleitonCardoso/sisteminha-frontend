import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Toggle from 'material-ui/Toggle';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import EvaluationService from '../services/EvaluationService'

import DatePicker from 'material-ui/DatePicker'

import Moment from 'moment'

const evaluationService = new EvaluationService();

export default class EvaluationDialog extends React.Component {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false,
      evaluation: {
        status: 'OPEN'
      }
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (event) => {
    this.setState({ open: false, evaluation: {} });
  };

  handleSave = (event) => {
    event.preventDefault();
    this.props.save(this.state.evaluation);
  };

  handleStartingDate = (event, date) => {
    var evaluation = this.state.evaluation
    evaluation.startingDate = date
    this.setState({
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

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.handleClose} />,
      <FlatButton
        label="Salvar"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSave} />,
    ];
    return (
      <div>
        <Dialog
          title={"Novo processo de avaliação"}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

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
        </Dialog>
      </div >
    );
  }
}