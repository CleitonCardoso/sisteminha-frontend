import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Toggle from 'material-ui/Toggle';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import TenantService from '../services/TenantService'

const tenantService = new TenantService();

export default class TenantDialog extends React.Component {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      open: false,
      tenant: {}
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (event) => {
    this.props.handler();
    this.setState({ open: false, tenant: {} });
  };

  handleSave = (event) => {
    event.preventDefault();
    tenantService.save(response => {
      if (response.status === 200) {
        this.handleClose()
      }
    }, this.state.tenant)
  };

  setValue = (event) => {
    var tenant = this.state.tenant;
    var field = event.target.id;
    var value = event.target.value;
    if (field === "active") {
      value = event.target.checked;
    }
    tenant[field] = value;
    this.setState({
      tenant
    })
  }

  setMaturityLevel = (event, index, value) => {
    var tenant = this.state.tenant;
    tenant.maturityLevel = value;
    this.setState({
      tenant
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
          title={"Nova Empresa"}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Nome da empresa"
            fullWidth={true}
            onChange={this.setValue}
            id="companyName"
            value={this.state.tenant.companyName}
          /><br />
          <TextField
            floatingLabelText="Nome do responsável"
            fullWidth={true}
            onChange={this.setValue}
            id="companyOwner"
          />
          <TextField
            floatingLabelText="Telefone"
            fullWidth={true}
            onChange={this.setValue}
            id="phone"
          />
          Nível de maturidade
          <DropDownMenu value={this.state.tenant.maturityLevel || 'PROJECT'} onChange={this.setMaturityLevel}>
            <MenuItem value={'PROJECT'} primaryText="Projeto" />
            <MenuItem value={'IMPLANTATION'} primaryText="Implantação" />
            <MenuItem value={'GROWING'} primaryText="Crescimento" />
            <MenuItem value={'CONSOLIDATION'} primaryText="Consolidação" />
            <MenuItem value={'GRADUATION'} primaryText="Graduação" />
          </DropDownMenu>
          <br />
        </Dialog>
      </div >
    );
  }
}