import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Toggle from 'material-ui/Toggle'

export default class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      user: {}
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = event => {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={this.props.actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        />
      </div>
    )
  }
}
