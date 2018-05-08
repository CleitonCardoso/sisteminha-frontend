import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Toggle from 'material-ui/Toggle';

import UserService from '../services/UserService'

const userService = new UserService();

export default class UserDialog extends React.Component {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false,
      user: {
        role : 'TENANT'
      }
    }
  }

  handleOpen = (user) => {
    if (!user)
      user = {};
    this.setState({ open: true, user: user });
  };

  handleClose = (event) => {
    this.props.handler();
    this.setState({ open: false, user: {} });
  };

  handleSave = (event) => {
    event.preventDefault();
    userService.save(response => {
      if (response.status === 200) {
        this.handleClose()
      }
    }, this.state.user)
  };

  setValue = (event) => {
    var user = this.state.user;
    var field = event.target.id;
    var value = event.target.value;
    if (field === "active") {
      value = event.target.checked;
    }
    user[field] = value;
    this.setState({
      user
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
          title={this.state.user.id ? "Editar Usuário" : "Novo Usuário"}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Nome de usuário"
            fullWidth={true}
            onChange={this.setValue}
            id="username"
            value={this.state.user.username}
          /><br />
          <TextField
            floatingLabelText="Senha"
            fullWidth={true}
            onChange={this.setValue}
            id="password"
            type="password"
          />
          <br />
          <br />
          <Toggle
            label="Ativo"
            defaultToggled={this.state.user.active}
            onToggle={this.setValue}
            id="active"
          />
        </Dialog>
      </div >
    );
  }
}