import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import Cookies from 'universal-cookie';

import './App.css';

import UserDialog from './UserDialog';

import UserService from '../services/UserService'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const userService = new UserService();

export default class UserListView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: [],
      users: [],
    }
  }

  reloadList = () => {
    userService.listAll(response => {
      if (response.status === 200) {
        this.setState({
          users: response.data,
          selected: []
        })
      }
    })
  }

  componentDidMount() {
    this.reloadList();
  }

  handleRowSelection = (selectedRows) => {
    if (selectedRows === "none") {
      selectedRows = []
    }
    this.setState({
      selected: selectedRows
    })
  };

  getSelected = () => {
    return this.state.users[this.state.selected];
  }

  addItem = (e) => {
    e.preventDefault();
    this.refs.myDialog.handleOpen(this.getSelected());
  }

  removeItem = (e) => {
    if (this.state.selected.length > 0) {
      userService.remove(response => {
        if (response.status === 200) {
          this.reloadList();
        }
      }, this.state.users[this.state.selected])
    }
  }

  render() {
    return (
      <div>
        {/* <Paper zDepth={1} > */}
        <UserDialog ref="myDialog" handler={this.reloadList} />
        <div style={buttons}>
          <br />
          <RaisedButton label={this.state.selected.length === 0 ? "Adicionar" : "Editar"} primary style={btn} onClick={this.addItem} disabled={this.state.selected.length > 1} />
          <RaisedButton label="Remover" secondary style={btn} disabled={this.state.selected.length === 0} onClick={this.removeItem} />
          <br />
        </div>
        <Table onRowSelection={this.handleRowSelection} setSelectedRows={this.state.selected}  >
          <TableHeader enableSelectAll={true} displaySelectAll={true}  >
            <TableRow>
              <TableHeaderColumn>Nome de usuário</TableHeaderColumn>
              <TableHeaderColumn>Tipo de usuário</TableHeaderColumn>
              <TableHeaderColumn>Nome da incubadora</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover={true} deselectOnClickaway={false}>
            {this.state.users && this.state.users.map((user, index) =>
              <TableRow key={index} selected={this.state.selected.indexOf(index) !== -1} >
                <TableRowColumn>{user.username}</TableRowColumn>
                <TableRowColumn>{user.role}</TableRowColumn>
                <TableRowColumn>{user.incubator.name}</TableRowColumn>
                <TableRowColumn>{user.active ? "Ativo" : "Inativo"}</TableRowColumn>
              </TableRow>
            )
            }
          </TableBody>
        </Table>
        {/* </Paper> */}
      </div >
    );
  }
}

const btn = {
  margin: 20
}

const buttons = {
  textAlign: 'left'
}
